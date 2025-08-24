'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

export default function SettingsPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        System Settings
      </Typography>
      <Typography variant="body1" color="text.secondary">
        System settings will be implemented here.
      </Typography>
    </Box>
  );
}
