import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Add,
  FileUpload,
  Assessment,
  People,
  History,
  Refresh,
} from '@mui/icons-material';

interface QuickActionsProps {
  onAddResource?: () => void;
  onImport?: () => void;
  onReports?: () => void;
  onManageUsers?: () => void;
  onHistory?: () => void;
  onRefresh?: () => void;
  userRole?: string;
}

export function QuickActions({
  onAddResource,
  onImport,
  onReports,
  onManageUsers,
  onHistory,
  onRefresh,
  userRole = 'VIEWER'
}: QuickActionsProps) {
  const quickActionButtons = [
    {
      label: 'Add Resource',
      icon: <Add />,
      onClick: onAddResource,
      color: 'primary' as const,
      tooltip: 'Add new idle resource',
      roles: ['ADMIN', 'RA', 'MANAGER'],
    },
    {
      label: 'Import',
      icon: <FileUpload />,
      onClick: onImport,
      color: 'secondary' as const,
      tooltip: 'Import resources from CSV/Excel',
      roles: ['ADMIN', 'RA'],
    },
    {
      label: 'Reports',
      icon: <Assessment />,
      onClick: onReports,
      color: 'info' as const,
      tooltip: 'View detailed reports',
      roles: ['ADMIN', 'RA', 'MANAGER'],
    },
    {
      label: 'Manage Users',
      icon: <People />,
      onClick: onManageUsers,
      color: 'warning' as const,
      tooltip: 'User management (Admin only)',
      roles: ['ADMIN'],
    },
    {
      label: 'History',
      icon: <History />,
      onClick: onHistory,
      color: 'success' as const,
      tooltip: 'View update history',
      roles: ['ADMIN', 'RA', 'MANAGER'],
    },
    {
      label: 'Refresh',
      icon: <Refresh />,
      onClick: onRefresh,
      color: 'inherit' as const,
      tooltip: 'Refresh dashboard data',
      roles: ['ADMIN', 'RA', 'MANAGER', 'VIEWER'],
    },
  ];

  const visibleActions = quickActionButtons.filter(action => 
    action.roles.includes(userRole)
  );

  return (
    <Card>
      <CardHeader 
        title="Quick Actions"
        subheader="Frequently used actions and navigation"
      />
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2,
          justifyContent: 'center'
        }}>
          {visibleActions.map((action, index) => (
            <Tooltip key={index} title={action.tooltip} arrow>
              <Button
                variant="outlined"
                color={action.color}
                startIcon={action.icon}
                onClick={action.onClick}
                sx={{
                  minWidth: 140,
                  textTransform: 'none',
                  borderRadius: 2,
                  py: 1.5,
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: 2,
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {action.label}
              </Button>
            </Tooltip>
          ))}
        </Box>
        
        {visibleActions.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No quick actions available for your role
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
