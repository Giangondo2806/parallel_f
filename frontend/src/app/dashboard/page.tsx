'use client';

import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

import { StatCard, RecentActivities, DepartmentChart, QuickActions } from '../../components/dashboard';
import { useDashboard } from '../../hooks/useDashboard';
import { mockDepartmentOptions } from '../../lib/mock-data/dashboard';

export default function DashboardPage() {
  const [departmentFilter, setDepartmentFilter] = React.useState('all');
  
  const {
    stats,
    activities,
    departmentData,
    loading,
    error,
    lastRefresh,
    refreshAll,
    clearError,
  } = useDashboard({ departmentId: departmentFilter });

  const handleDepartmentChange = (newDepartment: string) => {
    setDepartmentFilter(newDepartment);
    refreshAll({ departmentId: newDepartment });
  };

  const handleRefresh = () => {
    refreshAll({ departmentId: departmentFilter });
  };

  const handleQuickActions = {
    onAddResource: () => {
      // TODO: Navigate to add resource page
      console.log('Navigate to /dashboard/resources/new');
    },
    onImport: () => {
      // TODO: Navigate to import page
      console.log('Navigate to /dashboard/resources/import');
    },
    onReports: () => {
      // TODO: Navigate to reports page
      console.log('Navigate to /dashboard/reports');
    },
    onManageUsers: () => {
      // TODO: Navigate to user management (Admin only)
      console.log('Navigate to /dashboard/users');
    },
    onHistory: () => {
      // TODO: Navigate to history page
      console.log('Navigate to /dashboard/history');
    },
  };

  const handleViewAllActivities = () => {
    // TODO: Navigate to full history page
    console.log('Navigate to /dashboard/history');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          {lastRefresh && (
            <Typography variant="body2" color="textSecondary">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={departmentFilter}
              label="Department"
              onChange={(e) => handleDepartmentChange(e.target.value)}
              disabled={loading}
            >
              {mockDepartmentOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={loading ? <CircularProgress size={16} /> : <RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          onClose={clearError}
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      {stats && (
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          mb: 3,
          '& > *': { 
            flex: '1 1 250px',
            minWidth: '250px'
          }
        }}>
          <StatCard
            title="Total Idle"
            value={stats.totalIdle}
            trend={stats.trend?.totalChange}
            color="primary"
            icon={<PeopleIcon />}
          />

          <StatCard
            title="Urgent (≥2mo)"
            value={stats.urgentCount}
            trend={stats.trend?.urgentChange}
            color="error"
            icon={<WarningIcon />}
          />

          <StatCard
            title="Available Now"
            value={stats.availableNow}
            trend={stats.trend?.availableChange}
            color="success"
            icon={<CheckCircleIcon />}
          />

          <StatCard
            title="Assigned This Week"
            value={stats.assignedThisWeek}
            trend={stats.trend?.assignedChange}
            color="info"
            icon={<AssignmentIcon />}
          />
        </Box>
      )}

      {/* Charts and Activities */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3, 
        mb: 3 
      }}>
        {/* Department Breakdown Chart */}
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <DepartmentChart
            data={departmentData}
            title="Idle by Department"
          />
        </Box>

        {/* Recent Activities */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <RecentActivities
            activities={activities}
            onViewAll={handleViewAllActivities}
          />
        </Box>
      </Box>

      {/* Quick Actions */}
      <QuickActions {...handleQuickActions} />

      {/* Loading Overlay for better UX */}
      {loading && !stats && (
        <Box 
          sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
}
