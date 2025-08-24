import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from '@mui/material';
import {
  Add as AddIcon,
  CloudDownload as DownloadIcon,
  Assessment as ReportIcon,
  Group as GroupIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  variant: 'contained' | 'outlined';
  onClick: () => void;
}

interface QuickActionsProps {
  onAddResource?: () => void;
  onImport?: () => void;
  onReports?: () => void;
  onManageUsers?: () => void;
  onHistory?: () => void;
}

export function QuickActions({
  onAddResource,
  onImport,
  onReports,
  onManageUsers,
  onHistory,
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      label: 'Add Resource',
      icon: <AddIcon />,
      variant: 'contained',
      onClick: onAddResource || (() => console.log('Navigate to add resource')),
    },
    {
      label: 'Import',
      icon: <DownloadIcon />,
      variant: 'outlined',
      onClick: onImport || (() => console.log('Navigate to import')),
    },
    {
      label: 'Reports',
      icon: <ReportIcon />,
      variant: 'outlined',
      onClick: onReports || (() => console.log('Navigate to reports')),
    },
    {
      label: 'Manage Users',
      icon: <GroupIcon />,
      variant: 'outlined',
      onClick: onManageUsers || (() => console.log('Navigate to manage users')),
    },
    {
      label: 'History',
      icon: <HistoryIcon />,
      variant: 'outlined',
      onClick: onHistory || (() => console.log('Navigate to history')),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant}
              startIcon={action.icon}
              onClick={action.onClick}
              sx={{ minWidth: 120 }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
