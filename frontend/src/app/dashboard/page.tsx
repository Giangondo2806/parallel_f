'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Alert,
  Snackbar,
  Skeleton
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { DashboardStatsCards } from '../../components/dashboard/DashboardStatsCards';
import { DepartmentBreakdown } from '../../components/dashboard/DepartmentBreakdown';
import { RecentActivities } from '../../components/dashboard/RecentActivities';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { 
  MOCK_DASHBOARD_STATISTICS, 
  MOCK_RECENT_ACTIVITIES 
} from '../../lib/mock-data/dashboard';
import { DashboardStatistics, RecentActivity } from '../../types/dashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<DashboardStatistics>(MOCK_DASHBOARD_STATISTICS);
  const [activities, setActivities] = useState<RecentActivity[]>(MOCK_RECENT_ACTIVITIES);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock user role - in real implementation, get from auth context
  const userRole = 'ADMIN'; // 'ADMIN' | 'RA' | 'MANAGER' | 'VIEWER'

  useEffect(() => {
    // Mock data loading
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real implementation, replace with API calls:
        // const statsResponse = await dashboardApi.getStatistics();
        // const activitiesResponse = await dashboardApi.getRecentActivities();
        
        setStatistics(MOCK_DASHBOARD_STATISTICS);
        setActivities(MOCK_RECENT_ACTIVITIES);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error('Dashboard loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleAddResource = () => {
    router.push('/dashboard/resources?action=create');
  };

  const handleImport = () => {
    router.push('/dashboard/resources?tab=import');
  };

  const handleReports = () => {
    router.push('/dashboard/reports');
  };

  const handleManageUsers = () => {
    router.push('/dashboard/users');
  };

  const handleHistory = () => {
    router.push('/dashboard/history');
  };

  const handleViewAllActivities = () => {
    router.push('/dashboard/history');
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      
      // Simulate API refresh
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real implementation:
      // await dashboardApi.refreshData();
      
      setShowSuccess(true);
    } catch (err) {
      setError('Failed to refresh dashboard data.');
      console.error('Dashboard refresh error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Idle Resource Management System. Monitor and manage your resources efficiently.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Box sx={{ mb: 4 }}>
        <DashboardStatsCards 
          statistics={statistics} 
          loading={loading}
        />
      </Box>

      {/* Main Content Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
        gap: 3,
        mb: 4
      }}>
        {/* Department Breakdown */}
        <DepartmentBreakdown 
          departments={statistics.departmentBreakdown}
          loading={loading}
        />

        {/* Recent Activities */}
        <RecentActivities 
          activities={activities}
          loading={loading}
          onViewAll={handleViewAllActivities}
        />
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <QuickActions
          onAddResource={handleAddResource}
          onImport={handleImport}
          onReports={handleReports}
          onManageUsers={handleManageUsers}
          onHistory={handleHistory}
          onRefresh={handleRefresh}
          userRole={userRole}
        />
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Dashboard data refreshed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
