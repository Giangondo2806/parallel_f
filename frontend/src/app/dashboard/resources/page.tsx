'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Warning as UrgentIcon,
} from '@mui/icons-material';

// Mock data for resource list
const MOCK_RESOURCES = [
  {
    resourceId: 1,
    employeeCode: 'EMP001',
    fullName: 'Nguyen Van A',
    departmentName: 'IT Department',
    skillSet: 'Java, Spring Boot, ReactJS',
    idleFrom: '2025-01-06',
    rate: '500$',
    isUrgent: true,
    status: 'Available',
  },
  {
    resourceId: 2,
    employeeCode: 'EMP002',
    fullName: 'Tran Thi B',
    departmentName: 'QA Department',
    skillSet: 'Testing, Automation, Selenium',
    idleFrom: '2025-07-15',
    rate: '400$',
    isUrgent: false,
    status: 'Available',
  },
  {
    resourceId: 3,
    employeeCode: 'EMP003',
    fullName: 'Le Van C',
    departmentName: 'BA Department',
    skillSet: 'Business Analysis, SQL',
    idleFrom: '2025-05-01',
    rate: '600$',
    isUrgent: true,
    status: 'Available',
  },
];

export default function ResourcesPage() {
  const router = useRouter();
  const [resources] = useState(MOCK_RESOURCES);

  const handleAddNew = () => {
    router.push('/dashboard/resources/add');
  };

  const handleEdit = (resourceId: number) => {
    router.push(`/dashboard/resources/${resourceId}`);
  };

  const handleDownloadCV = (resourceId: number, resourceName: string) => {
    // TODO: Implement CV download
    console.log(`Download CV for ${resourceName} (ID: ${resourceId})`);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Idle Resources Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New Resource
        </Button>
      </Box>

      {/* Resource Table */}
      <Card>
        <CardHeader title="Resource List" />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Urgent</TableCell>
                <TableCell>Employee Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell>Idle From</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.resourceId}>
                  <TableCell>
                    {resource.isUrgent && (
                      <Chip 
                        icon={<UrgentIcon />}
                        label="🔥" 
                        color="error" 
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell>{resource.employeeCode}</TableCell>
                  <TableCell>{resource.fullName}</TableCell>
                  <TableCell>{resource.departmentName}</TableCell>
                  <TableCell>{resource.skillSet}</TableCell>
                  <TableCell>{new Date(resource.idleFrom).toLocaleDateString()}</TableCell>
                  <TableCell>{resource.rate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={resource.status} 
                      color="primary" 
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleDownloadCV(resource.resourceId, resource.fullName)}
                        title="Download CV"
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(resource.resourceId)}
                        title="Edit Resource"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {resources.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body2" color="text.secondary">
                No resources found. Click "Add New Resource" to get started.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Box display="flex" gap={4}>
            <Typography variant="body2">
              Total Resources: <strong>{resources.length}</strong>
            </Typography>
            <Typography variant="body2" color="error">
              Urgent: <strong>{resources.filter(r => r.isUrgent).length}</strong>
            </Typography>
            <Typography variant="body2" color="success.main">
              Available: <strong>{resources.filter(r => r.status === 'Available').length}</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
