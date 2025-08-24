import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from '@mui/material';

interface DepartmentData {
  department: string;
  total: number;
  urgent: number;
  available: number;
}

interface DepartmentChartProps {
  data: DepartmentData[];
  title?: string;
}

export function DepartmentChart({ data, title = "Idle by Department" }: DepartmentChartProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          {/* Chart Placeholder */}
          <Box sx={{ 
            width: '100%', 
            height: 200, 
            backgroundColor: 'grey.100', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: 1,
            mb: 2
          }}>
            <Typography variant="body2" color="textSecondary">
              Chart Placeholder - Department Breakdown
              <br />
              TODO: Integrate with Chart.js or Recharts for visualization
            </Typography>
          </Box>
          
          {/* Department Stats Grid */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'center'
          }}>
            {data.map((dept) => (
              <Box key={dept.department} sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <Paper sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {dept.department}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total: <strong>{dept.total}</strong>
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    Urgent: <strong>{dept.urgent}</strong>
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Available: <strong>{dept.available}</strong>
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
