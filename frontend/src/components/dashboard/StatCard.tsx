import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from '@mui/material';

interface StatCardProps {
  title: string;
  value: number;
  trend?: number;
  color?: 'primary' | 'error' | 'success' | 'info' | 'warning';
  icon: React.ReactNode;
}

export function StatCard({ title, value, trend, color = 'primary', icon }: StatCardProps) {
  const formatTrendIndicator = (change: number) => {
    const isPositive = change > 0;
    return (
      <Chip
        label={`${isPositive ? '+' : ''}${change}`}
        size="small"
        color={isPositive ? 'success' : 'error'}
        variant="outlined"
      />
    );
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" color={color === 'primary' ? 'text.primary' : `${color}.main`}>
              {value}
            </Typography>
            {trend !== undefined && formatTrendIndicator(trend)}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main` }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}
