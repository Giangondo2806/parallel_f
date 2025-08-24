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
  LinearProgress,
  Chip,
} from '@mui/material';
import { DepartmentStat } from '../../types/dashboard';

interface DepartmentBreakdownProps {
  departments: DepartmentStat[];
  loading?: boolean;
}

export function DepartmentBreakdown({ 
  departments, 
  loading = false 
}: DepartmentBreakdownProps) {
  if (loading) {
    return (
      <Card sx={{ height: 400 }}>
        <CardHeader title="Idle by Department" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Box key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 16,
                      backgroundColor: 'grey.200',
                      borderRadius: 1,
                    }}
                  />
                  <Box
                    sx={{
                      width: 40,
                      height: 16,
                      backgroundColor: 'grey.200',
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <LinearProgress variant="determinate" value={0} sx={{ mb: 1 }} />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  const maxCount = Math.max(...departments.map(d => d.idleCount));

  return (
    <Card sx={{ height: 400 }}>
      <CardHeader 
        title="Idle by Department"
        subheader="Distribution of idle resources across departments"
      />
      <CardContent>
        <List sx={{ p: 0 }}>
          {departments.map((dept, index) => (
            <ListItem 
              key={dept.departmentId} 
              sx={{ 
                px: 0, 
                flexDirection: 'column', 
                alignItems: 'stretch',
                borderBottom: index < departments.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                pb: 2,
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  {dept.departmentName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={`${dept.idleCount} idle`} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  {dept.urgentCount > 0 && (
                    <Chip 
                      label={`${dept.urgentCount} urgent`} 
                      size="small" 
                      color="error" 
                      variant="filled"
                    />
                  )}
                </Box>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={(dept.idleCount / maxCount) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: dept.urgentCount > 0 ? 'error.main' : 'primary.main',
                    },
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {dept.percentage.toFixed(1)}% of total
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {dept.idleCount} / {departments.reduce((sum, d) => sum + d.idleCount, 0)} resources
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        
        {departments.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              No department data available
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
