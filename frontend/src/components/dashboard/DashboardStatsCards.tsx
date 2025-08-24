import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Warning,
  Group,
  Assignment,
  CheckCircle,
} from '@mui/icons-material';
import { DashboardStatistics } from '../../types/dashboard';

interface DashboardStatsCardsProps {
  statistics: DashboardStatistics;
  loading?: boolean;
}

export function DashboardStatsCards({ 
  statistics, 
  loading = false 
}: DashboardStatsCardsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp sx={{ color: 'error.main' }} />;
      case 'down':
        return <TrendingDown sx={{ color: 'success.main' }} />;
      default:
        return <TrendingFlat sx={{ color: 'warning.main' }} />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'error';
      case 'down':
        return 'success';
      default:
        return 'warning';
    }
  };

  const statCards = [
    {
      title: 'Total Idle',
      value: statistics.totalIdle,
      icon: <Group sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary.main',
      description: 'Total idle resources',
    },
    {
      title: 'Urgent (≥2mo)',
      value: statistics.urgentIdle,
      icon: <Warning sx={{ fontSize: 40, color: 'error.main' }} />,
      color: 'error.main',
      description: 'Resources idle for 2+ months',
    },
    {
      title: 'Available Now',
      value: statistics.availableNow,
      icon: <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main',
      description: 'Currently available resources',
    },
    {
      title: 'Assigned This Week',
      value: statistics.assignedThisWeek,
      icon: <Assignment sx={{ fontSize: 40, color: 'info.main' }} />,
      color: 'info.main',
      description: 'Resources assigned this week',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {[1, 2, 3, 4].map((index) => (
          <Box sx={{ flex: '1 1 280px', minWidth: '280px' }} key={index}>
            <Card sx={{ height: 120, display: 'flex', alignItems: 'center' }}>
              <CardContent sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: 'grey.200',
                      borderRadius: 1,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        height: 20,
                        backgroundColor: 'grey.200',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    />
                    <Box
                      sx={{
                        height: 16,
                        backgroundColor: 'grey.100',
                        borderRadius: 1,
                        width: '60%',
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {statCards.map((card, index) => (
          <Box sx={{ flex: '1 1 280px', minWidth: '280px' }} key={index}>
            <Card
              sx={{
                height: 120,
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box>{card.icon}</Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ color: card.color, fontWeight: 'bold' }}>
                      {card.value}
                    </Typography>
                    <Tooltip title={card.description} arrow>
                      <Typography variant="body2" color="text.secondary">
                        {card.title}
                      </Typography>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Weekly Comparison */}
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">Weekly Comparison</Typography>
              <Chip
                icon={getTrendIcon(statistics.weeklyComparison.trend)}
                label={`${statistics.weeklyComparison.changePercentage.toFixed(1)}%`}
                color={getTrendColor(statistics.weeklyComparison.trend) as any}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Current Week
                </Typography>
                <Typography variant="h6">
                  {statistics.weeklyComparison.currentWeek}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Previous Week
                </Typography>
                <Typography variant="h6">
                  {statistics.weeklyComparison.previousWeek}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
