import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import {
  Edit,
  Add,
  Download,
  FileUpload,
  Assignment,
  Settings,
  MoreHoriz,
} from '@mui/icons-material';
import { RecentActivity } from '../../types/dashboard';

interface RecentActivitiesProps {
  activities: RecentActivity[];
  loading?: boolean;
  onViewAll?: () => void;
}

export function RecentActivities({ 
  activities, 
  loading = false,
  onViewAll
}: RecentActivitiesProps) {
  const getActionIcon = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case 'update':
        return <Edit />;
      case 'create':
        return <Add />;
      case 'download':
        return <Download />;
      case 'import':
        return <FileUpload />;
      case 'assign':
        return <Assignment />;
      default:
        return <MoreHoriz />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case 'update':
        return 'primary';
      case 'create':
        return 'success';
      case 'download':
        return 'info';
      case 'import':
        return 'warning';
      case 'assign':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  if (loading) {
    return (
      <Card sx={{ height: 400 }}>
        <CardHeader title="Recent Activities" />
        <CardContent>
          <List sx={{ p: 0 }}>
            {[1, 2, 3, 4, 5].map((index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'grey.200', width: 40, height: 40 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        width: '80%',
                        height: 16,
                        backgroundColor: 'grey.200',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    />
                  }
                  secondary={
                    <Box
                      sx={{
                        width: '60%',
                        height: 12,
                        backgroundColor: 'grey.100',
                        borderRadius: 1,
                      }}
                    />
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: 400 }}>
      <CardHeader 
        title="Recent Activities"
        subheader="Latest system activities and updates"
        action={
          onViewAll && (
            <Button 
              size="small" 
              onClick={onViewAll}
              sx={{ textTransform: 'none' }}
            >
              View All
            </Button>
          )
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <List sx={{ p: 0 }}>
          {activities.slice(0, 5).map((activity, index) => (
            <ListItem 
              key={activity.id} 
              sx={{ 
                px: 0,
                borderBottom: index < Math.min(activities.length, 5) - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                pb: 2,
                mb: index < Math.min(activities.length, 5) - 1 ? 2 : 0,
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  sx={{ 
                    bgcolor: `${getActionColor(activity.actionType)}.main`,
                    width: 40, 
                    height: 40 
                  }}
                >
                  {getActionIcon(activity.actionType)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {activity.description}
                    </Typography>
                    <Chip 
                      label={activity.actionType}
                      size="small"
                      color={getActionColor(activity.actionType) as any}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      by {activity.performedBy}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(activity.performedAt)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
        
        {activities.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              No recent activities
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
