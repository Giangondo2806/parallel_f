'use client';

import React from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';

interface LoadingProps {
  message?: string;
  size?: number;
  backdrop?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  size = 40,
  backdrop = false 
}) => {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={3}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );

  if (backdrop) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        {content}
      </Backdrop>
    );
  }

  return content;
};

export default Loading;
