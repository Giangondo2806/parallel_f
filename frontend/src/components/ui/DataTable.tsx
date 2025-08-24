'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Toolbar,
  Tooltip,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  ViewColumn as ViewColumnIcon
} from '@mui/icons-material';

export interface DataTableColumn {
  id: string;
  label: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (selectedRows: any[]) => void;
  disabled?: (selectedRows: any[]) => boolean;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  data: any[];
  title?: string;
  searchable?: boolean;
  selectable?: boolean;
  actions?: DataTableAction[];
  pagination?: boolean;
  pageSize?: number;
  loading?: boolean;
  onRowClick?: (row: any) => void;
  density?: 'compact' | 'standard' | 'comfortable';
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  searchable = true,
  selectable = false,
  actions = [],
  pagination = true,
  pageSize = 10,
  loading = false,
  onRowClick,
  density = 'standard'
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [selected, setSelected] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);

  // Filter data based on search term
  const filteredData = searchTerm
    ? data.filter(row =>
        columns.some(column =>
          String(row[column.id]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  // Paginate data
  const paginatedData = pagination
    ? filteredData.slice(page * rowsPerPage, page + rowsPerPage)
    : filteredData;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(paginatedData);
    } else {
      setSelected([]);
    }
  };

  const handleRowSelect = (row: any) => {
    const selectedIndex = selected.findIndex(item => item.id === row.id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (row: any) => selected.findIndex(item => item.id === row.id) !== -1;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDensityProps = () => {
    switch (density) {
      case 'compact': return { size: 'small' as const, padding: 'none' as const };
      case 'comfortable': return { size: 'medium' as const, padding: 'normal' as const };
      default: return { size: 'medium' as const, padding: 'normal' as const };
    }
  };

  return (
    <Paper sx={{ width: '100%' }}>
      {/* Toolbar */}
      {(title || searchable || actions.length > 0) && (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              component="div"
            >
              {title}
            </Typography>
          )}

          {selected.length > 0 ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {actions.map(action => (
                <Tooltip key={action.id} title={action.label}>
                  <IconButton
                    onClick={() => action.onClick(selected)}
                    disabled={action.disabled?.(selected)}
                  >
                    {action.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {searchable && (
                <TextField
                  size="small"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 200 }}
                />
              )}
              <Tooltip title="Filter list">
                <IconButton>
                  <FilterIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Column settings">
                <IconButton>
                  <ViewColumnIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      )}

      {/* Table */}
      <TableContainer>
        <Table {...getDensityProps()}>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < paginatedData.length}
                    checked={paginatedData.length > 0 && selected.length === paginatedData.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => {
              const isItemSelected = isSelected(row);
              return (
                <TableRow
                  hover
                  onClick={() => {
                    if (selectable) {
                      handleRowSelect(row);
                    } else if (onRowClick) {
                      onRowClick(row);
                    }
                  }}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id || index}
                  selected={isItemSelected}
                  sx={{ 
                    cursor: onRowClick || selectable ? 'pointer' : 'default',
                  }}
                >
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleRowSelect(row)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.render ? column.render(row[column.id], row) : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default DataTable;
