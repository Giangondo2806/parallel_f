'use client';

import React from 'react';
import { Box, Typography, Chip, Container } from '@mui/material';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const getSystemStatus = () => {
    // In real app, this would be dynamic
    return {
      status: 'Online',
      lastSync: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      totalUsers: 25,
      activeUsers: 22,
      inactiveUsers: 3,
      totalResources: 125,
      urgentResources: 23
    };
  };

  const systemInfo = getSystemStatus();

  return (
    <Box
      component="footer"
      className={className}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        bgcolor: 'grey.100',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        zIndex: (theme) => theme.zIndex.appBar - 1,
        px: 2
      }}
    >
      <Container maxWidth={false} sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Left Section - System Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Status:
          </Typography>
          <Chip
            label={systemInfo.status}
            size="small"
            color="success"
            variant="outlined"
            sx={{ height: 20, fontSize: '0.7rem' }}
          />
          
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
            Last sync: {systemInfo.lastSync}
          </Typography>
        </Box>

        {/* Center Section - Quick Stats */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center', 
          gap: 2, 
          mx: 'auto' 
        }}>
          <Typography variant="caption" color="text.secondary">
            {systemInfo.totalResources} resources
          </Typography>
          
          {systemInfo.urgentResources > 0 && (
            <>
              <Typography variant="caption" color="text.secondary">•</Typography>
              <Typography variant="caption" color="warning.main">
                {systemInfo.urgentResources} urgent
              </Typography>
            </>
          )}
          
          <Typography variant="caption" color="text.secondary">•</Typography>
          <Typography variant="caption" color="text.secondary">
            {systemInfo.activeUsers}/{systemInfo.totalUsers} users active
          </Typography>
        </Box>

        {/* Right Section - Copyright */}
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            © 2025 FJP. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
