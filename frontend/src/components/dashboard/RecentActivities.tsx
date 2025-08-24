import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Box,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  Add as AddIcon,
  CloudDownload as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

interface Activity {
  id: number;
  action: string;
  description: string;
  userName: string;
  resourceName?: string;
  timestamp: Date;
  icon: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  onViewAll?: () => void;
}

export function RecentActivities({ activities, onViewAll }: RecentActivitiesProps) {
  const getActivityIcon = (iconType: string) => {
    switch (iconType) {
      case 'edit':
        return <PeopleIcon />;
      case 'add':
        return <AddIcon />;
      case 'download':
        return <DownloadIcon />;
      case 'backup':
        return <CheckCircleIcon />;
      default:
        return <HistoryIcon />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>
        <List>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'grey.300' }}>
                    {getActivityIcon(activity.icon)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={activity.description}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="text.primary">
                        {activity.userName}
                      </Typography>
                      {` — ${activity.timestamp.toLocaleString()}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button variant="text" size="small" onClick={onViewAll}>
            View All Activities
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
