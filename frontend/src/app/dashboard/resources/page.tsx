'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Menu,
  MenuList,
  MenuItem as DropdownMenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  VisibilityOff as VisibilityOffIcon,
  PushPin as PinIcon,
  GetApp as ExportIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useResources } from '../../../hooks/useResources';
import { ColumnVisibility, ResourceFilters } from '../../../types/resources';

export default function ResourcesPage() {
  const router = useRouter();
  const {
    resources,
    loading,
    error,
    totalCount,
    filterOptions,
    loadResources,
    searchResources,
    deleteResource,
    bulkDeleteResources,
    bulkUpdateStatus,
    setError,
  } = useResources();

  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<ResourceFilters>({
    departments: [],
    statuses: [],
    isUrgent: null,
    idleFromStart: '',
    idleFromEnd: '',
    skillSet: '',
  });
  
  // Column management
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    employeeCode: true,
    fullName: true,
    email: true,
    phone: true,
    jobTitle: true,
    skillSet: true,
    departmentName: true,
    idleFrom: true,
    status: true,
    rate: true, // Hidden for Viewer role
    isUrgent: true,
    actions: true,
  });

  const [pinnedColumns, setPinnedColumns] = useState({
    fullName: true,
    employeeCode: true,
  });

  // Menu states
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);
  const [bulkMenuAnchor, setBulkMenuAnchor] = useState<null | HTMLElement>(null);

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<number | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  // DataGrid columns
  const columns: GridColDef[] = [
    {
      field: 'employeeCode',
      headerName: 'Employee Code',
      width: 120,
      pinnable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 180,
      pinnable: true,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.row.isUrgent && (
            <Chip 
              label="URGENT" 
              size="small" 
              color="error" 
              sx={{ fontSize: '0.7rem' }}
            />
          )}
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 130,
    },
    {
      field: 'jobTitle',
      headerName: 'Job Title',
      width: 150,
    },
    {
      field: 'skillSet',
      headerName: 'Skills',
      width: 200,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'departmentName',
      headerName: 'Department',
      width: 160,
    },
    {
      field: 'idleFrom',
      headerName: 'Idle From',
      width: 120,
      renderCell: (params) => {
        const idleDate = new Date(params.value);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - idleDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isLongIdle = diffDays > 60; // More than 2 months
        
        return (
          <Box sx={{ color: isLongIdle ? 'error.main' : 'text.primary' }}>
            <Typography variant="body2">{params.value}</Typography>
            <Typography variant="caption" color="text.secondary">
              ({diffDays} days)
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value}
          size="small"
          color={
            params.value === 'Available' ? 'success' :
            params.value === 'Assigned' ? 'primary' :
            params.value === 'On Leave' ? 'warning' :
            'default'
          }
        />
      ),
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: 100,
      // This column would be hidden for Viewer role
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton 
            size="small" 
            onClick={() => router.push(`/dashboard/resources/${params.row.id}`)}
            title="View/Edit"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            onClick={() => handleDownloadCV(params.row.id)}
            disabled={!params.row.cvFiles || params.row.cvFiles.length === 0}
            title="Download CV"
          >
            <FileDownloadIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            onClick={() => {
              setResourceToDelete(params.row.id);
              setDeleteDialogOpen(true);
            }}
            title="Delete"
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ].filter(col => columnVisibility[col.field as keyof ColumnVisibility]);

  // Apply filters when they change
  useEffect(() => {
    const queryParams = {
      search: searchText,
      departmentIds: filters.departments.length > 0 ? filters.departments : undefined,
      statuses: filters.statuses.length > 0 ? filters.statuses as any : undefined,
      isUrgent: filters.isUrgent,
      idleFromStart: filters.idleFromStart || undefined,
      idleFromEnd: filters.idleFromEnd || undefined,
    };

    loadResources(queryParams);
  }, [filters, searchText, loadResources]);

  // Event handlers
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleFilterChange = (newFilters: ResourceFilters) => {
    setFilters(newFilters);
  };

  const handleAddResource = () => {
    router.push('/dashboard/resources/add');
  };

  const handleImport = () => {
    // TODO: Open import dialog
    console.log('Import resources');
  };

  const handleExport = () => {
    // TODO: Export resources with current filters
    console.log('Export resources');
  };

  const handleBulkAction = async (action: string) => {
    setBulkMenuAnchor(null);
    
    try {
      switch (action) {
        case 'download-cvs':
          await handleBulkDownloadCVs();
          break;
        case 'update-status':
          // TODO: Open status update dialog
          console.log('Bulk update status for:', selectedRows);
          break;
        case 'delete':
          setBulkDeleteDialogOpen(true);
          break;
      }
    } catch (err) {
      console.error('Bulk action error:', err);
    }
  };

  const handleDownloadCV = (resourceId: number) => {
    // TODO: Download CV file
    console.log('Download CV for resource:', resourceId);
  };

  const handleDeleteResource = async () => {
    if (resourceToDelete) {
      try {
        await deleteResource(resourceToDelete);
        setDeleteDialogOpen(false);
        setResourceToDelete(null);
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleBulkDelete = async () => {
    try {
      await bulkDeleteResources(selectedRows as number[]);
      setBulkDeleteDialogOpen(false);
      setSelectedRows([]);
    } catch (err) {
      console.error('Bulk delete error:', err);
    }
  };

  const handleBulkDownloadCVs = async () => {
    // TODO: Bulk download CVs as ZIP
    console.log('Bulk download CVs for:', selectedRows);
  };

  const toggleColumnVisibility = (columnField: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnField]: !prev[columnField],
    }));
  };

  const toggleColumnPin = (columnField: string) => {
    setPinnedColumns(prev => ({
      ...prev,
      [columnField]: !prev[columnField],
    }));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Idle Resources
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track idle resources across all departments
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Toolbar */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            {/* Search */}
            <TextField
              size="small"
              placeholder="Search resources..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
            />

            {/* Filters */}
            <Button
              startIcon={<FilterIcon />}
              onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
              variant="outlined"
            >
              Filters
            </Button>

            {/* Column Management */}
            <Button
              startIcon={<ViewIcon />}
              onClick={(e) => setColumnMenuAnchor(e.currentTarget)}
              variant="outlined"
            >
              Columns
            </Button>

            <Divider orientation="vertical" flexItem />

            {/* Actions */}
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleAddResource}
            >
              Add Resource
            </Button>

            <Button
              startIcon={<UploadIcon />}
              variant="outlined"
              onClick={handleImport}
            >
              Import
            </Button>

            <Button
              startIcon={<ExportIcon />}
              variant="outlined"
              onClick={handleExport}
            >
              Export
            </Button>

            {/* Bulk Actions */}
            {selectedRows.length > 0 && (
              <Button
                startIcon={<MoreVertIcon />}
                variant="outlined"
                onClick={(e) => setBulkMenuAnchor(e.currentTarget)}
                color="primary"
              >
                Bulk Actions ({selectedRows.length})
              </Button>
            )}
          </Box>

          {/* Active Filters Display */}
          {(filters.departments.length > 0 || filters.statuses.length > 0 || filters.isUrgent !== null) && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {filters.departments.map((deptId) => {
                const dept = filterOptions.departments.find(d => d.id === deptId);
                return dept ? (
                  <Chip
                    key={deptId}
                    label={`Dept: ${dept.name}`}
                    size="small"
                    onDelete={() => handleFilterChange({
                      ...filters,
                      departments: filters.departments.filter(id => id !== deptId)
                    })}
                  />
                ) : null;
              })}
              {filters.statuses.map((status) => (
                <Chip
                  key={status}
                  label={`Status: ${status}`}
                  size="small"
                  onDelete={() => handleFilterChange({
                    ...filters,
                    statuses: filters.statuses.filter(s => s !== status)
                  })}
                />
              ))}
              {filters.isUrgent !== null && (
                <Chip
                  label={`Urgent: ${filters.isUrgent ? 'Yes' : 'No'}`}
                  size="small"
                  onDelete={() => handleFilterChange({
                    ...filters,
                    isUrgent: null
                  })}
                />
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Data Grid */}
      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, padding: 0 }}>
          <DataGrid
            rows={resources}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={setSelectedRows}
            loading={loading}
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'grey.50',
                borderBottom: '2px solid rgba(224, 224, 224, 1)',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => setFilterMenuAnchor(null)}
        PaperProps={{ sx: { width: 320, maxHeight: 500 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Filter Resources
          </Typography>
          
          {/* Department Filter */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Departments</InputLabel>
            <Select
              multiple
              value={filters.departments}
              onChange={(e) => handleFilterChange({
                ...filters,
                departments: e.target.value as number[]
              })}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as number[]).map((value) => {
                    const dept = filterOptions.departments.find(d => d.id === value);
                    return (
                      <Chip key={value} label={dept?.name || value} size="small" />
                    );
                  })}
                </Box>
              )}
            >
              {filterOptions.departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  <Checkbox checked={filters.departments.includes(dept.id)} />
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Status Filter */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              multiple
              value={filters.statuses}
              onChange={(e) => handleFilterChange({
                ...filters,
                statuses: e.target.value as string[]
              })}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {filterOptions.statuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  <Checkbox checked={filters.statuses.includes(status.value)} />
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Urgent Filter */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Urgent Status</InputLabel>
            <Select
              value={filters.isUrgent === null ? '' : filters.isUrgent}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange({
                  ...filters,
                  isUrgent: value === '' ? null : value === 'true'
                });
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Urgent Only</MenuItem>
              <MenuItem value="false">Non-Urgent Only</MenuItem>
            </Select>
          </FormControl>

          {/* Date Range */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              type="date"
              label="Idle From Start"
              value={filters.idleFromStart}
              onChange={(e) => handleFilterChange({
                ...filters,
                idleFromStart: e.target.value
              })}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            <TextField
              type="date"
              label="Idle From End"
              value={filters.idleFromEnd}
              onChange={(e) => handleFilterChange({
                ...filters,
                idleFromEnd: e.target.value
              })}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Box>

          <Button
            variant="text"
            onClick={() => {
              setFilters({
                departments: [],
                statuses: [],
                isUrgent: null,
                idleFromStart: '',
                idleFromEnd: '',
                skillSet: '',
              });
            }}
          >
            Clear All Filters
          </Button>
        </Box>
      </Menu>

      {/* Column Management Menu */}
      <Menu
        anchorEl={columnMenuAnchor}
        open={Boolean(columnMenuAnchor)}
        onClose={() => setColumnMenuAnchor(null)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Manage Columns
          </Typography>
          <MenuList>
            {Object.entries(columnVisibility).map(([field, visible]) => (
              <DropdownMenuItem key={field}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visible}
                      onChange={() => toggleColumnVisibility(field as keyof ColumnVisibility)}
                    />
                  }
                  label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                />
                {(field === 'fullName' || field === 'employeeCode') && (
                  <IconButton
                    size="small"
                    onClick={() => toggleColumnPin(field)}
                    color={pinnedColumns[field] ? 'primary' : 'default'}
                  >
                    <PinIcon fontSize="small" />
                  </IconButton>
                )}
              </DropdownMenuItem>
            ))}
          </MenuList>
        </Box>
      </Menu>

      {/* Bulk Actions Menu */}
      <Menu
        anchorEl={bulkMenuAnchor}
        open={Boolean(bulkMenuAnchor)}
        onClose={() => setBulkMenuAnchor(null)}
      >
        <DropdownMenuItem onClick={() => handleBulkAction('download-cvs')}>
          <DownloadIcon sx={{ mr: 1 }} />
          Download CVs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleBulkAction('update-status')}>
          <EditIcon sx={{ mr: 1 }} />
          Update Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleBulkAction('delete')}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Selected
        </DropdownMenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this resource? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteResource} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={bulkDeleteDialogOpen} onClose={() => setBulkDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Bulk Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedRows.length} selected resources? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleBulkDelete} color="error" variant="contained">
            Delete All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
