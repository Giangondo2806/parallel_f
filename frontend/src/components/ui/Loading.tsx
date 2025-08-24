'use client';

import React from 'react';
import {
  CircularProgress,
  LinearProgress,
  Skeleton,
  Box,
  Typography,
  Backdrop,
  Card,
  CardContent
} from '@mui/material';

// Loading Spinner
export interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  color?: 'primary' | 'secondary' | 'inherit';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  message,
  color = 'primary'
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}
    >
      <CircularProgress size={size} color={color} />
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

// Page Loading Overlay
export interface PageLoadingProps {
  open: boolean;
  message?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  open,
  message = 'Loading...'
}) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: theme => theme.zIndex.drawer + 1,
        flexDirection: 'column'
      }}
      open={open}
    >
      <CircularProgress color="inherit" size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Backdrop>
  );
};

// Progress Bar
export interface ProgressBarProps {
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary';
  showValue?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'indeterminate',
  color = 'primary',
  showValue = false
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant={variant}
        value={value}
        color={color}
        sx={{ height: 8, borderRadius: 4 }}
      />
      {showValue && variant === 'determinate' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {Math.round(value || 0)}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// Table Loading Skeleton
export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true
}) => {
  return (
    <Card>
      <CardContent>
        {/* Header skeleton */}
        {showHeader && (
          <Box sx={{ mb: 2 }}>
            <Skeleton variant="rectangular" height={40} />
          </Box>
        )}
        
        {/* Rows skeleton */}
        {Array.from({ length: rows }).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant="rectangular"
                height={30}
                sx={{ flex: 1 }}
              />
            ))}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

// Card Loading Skeleton
export interface CardSkeletonProps {
  hasAvatar?: boolean;
  hasActions?: boolean;
  lines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  hasAvatar = false,
  hasActions = false,
  lines = 3
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {hasAvatar && (
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          )}
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        </Box>
        
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            height={16}
            sx={{ mb: 1 }}
            width={index === lines - 1 ? '80%' : '100%'}
          />
        ))}
        
        {hasActions && (
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Skeleton variant="rectangular" width={80} height={32} />
            <Skeleton variant="rectangular" width={80} height={32} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Button Loading State
export interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false
}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={onClick}
        disabled={disabled || loading}
        style={{
          padding: size === 'small' ? '6px 16px' : size === 'large' ? '12px 24px' : '8px 22px',
          backgroundColor: color === 'primary' ? '#1976d2' : '#9c27b0',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          opacity: disabled || loading ? 0.6 : 1
        }}
      >
        {children}
      </button>
      {loading && (
        <CircularProgress
          size={20}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-10px',
            marginLeft: '-10px',
          }}
        />
      )}
    </Box>
  );
};

export default LoadingSpinner;
