'use client';

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

// Chart placeholder components for future implementation
export interface ChartProps {
  data: any[];
  title?: string;
  width?: number | string;
  height?: number | string;
}

export const BarChart: React.FC<ChartProps> = ({ 
  data, 
  title, 
  width = '100%', 
  height = 300 
}) => {
  return (
    <Card>
      <CardContent>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        <Box 
          sx={{ 
            width, 
            height, 
            bgcolor: 'grey.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 1
          }}
        >
          <Typography variant="body1" color="text.secondary">
            📊 Bar Chart - {data.length} data points
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const PieChart: React.FC<ChartProps> = ({ 
  data, 
  title, 
  width = '100%', 
  height = 300 
}) => {
  return (
    <Card>
      <CardContent>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        <Box 
          sx={{ 
            width, 
            height, 
            bgcolor: 'grey.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 1
          }}
        >
          <Typography variant="body1" color="text.secondary">
            🥧 Pie Chart - {data.length} segments
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const LineChart: React.FC<ChartProps> = ({ 
  data, 
  title, 
  width = '100%', 
  height = 300 
}) => {
  return (
    <Card>
      <CardContent>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        <Box 
          sx={{ 
            width, 
            height, 
            bgcolor: 'grey.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 1
          }}
        >
          <Typography variant="body1" color="text.secondary">
            📈 Line Chart - {data.length} data points
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default { BarChart, PieChart, LineChart };
