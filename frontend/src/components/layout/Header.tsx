'use client';

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Chip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  Person,
  Settings,
  Menu as MenuIcon
} from '@mui/icons-material';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, showMenuButton = true }) => {
  const { user, logout, isLogoutLoading } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleUserMenuClose();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '/');
  };

  const getUserRole = () => {
    if (!user?.role) return '';
    const roleMap: { [key: string]: string } = {
      'admin': 'Admin',
      'ra': 'RA',
      'manager': 'Manager',
      'viewer': 'Viewer'
    };
    return roleMap[user.role.toLowerCase()] || user.role;
  };

  const getRoleColor = () => {
    if (!user?.role) return 'default';
    const colorMap: { [key: string]: 'error' | 'warning' | 'info' | 'success' | 'default' } = {
      'admin': 'error',
      'ra': 'warning', 
      'manager': 'info',
      'viewer': 'success'
    };
    return colorMap[user.role.toLowerCase()] || 'default';
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section - Logo and Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {showMenuButton && (
            <IconButton
              edge="start"
              onClick={onMenuToggle}
              sx={{ mr: 2, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                fontWeight: 700,
                color: '#1976d2',
                letterSpacing: '0.5px'
              }}
            >
              FJP - IRMS
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                ml: 2,
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Idle Resource Management System
            </Typography>
          </Box>
        </Box>

        {/* Right Section - Date, Notifications, User Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Current Date */}
          <Chip
            label={`📅 ${getCurrentDate()}`}
            size="small"
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              bgcolor: 'grey.100'
            }}
          />

          {/* Notifications */}
          <IconButton
            onClick={handleNotificationOpen}
            sx={{ color: 'text.primary' }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Info and Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {user?.fullName || user?.username || 'User'}
              </Typography>
              <Chip
                label={getUserRole()}
                size="small"
                color={getRoleColor()}
                sx={{ height: 20, fontSize: '0.75rem' }}
              />
            </Box>
            
            <IconButton
              onClick={handleUserMenuOpen}
              sx={{ p: 0.5 }}
            >
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36,
                  bgcolor: 'primary.main',
                  fontSize: '1rem'
                }}
              >
                {user?.fullName?.[0] || user?.username?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Box>
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <MenuItem onClick={handleUserMenuClose}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Profile</Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </ListItemText>
          </MenuItem>
          
          <MenuItem onClick={handleUserMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          
          <Divider />
          
          <MenuItem 
            onClick={handleLogout}
            disabled={isLogoutLoading}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText>
              {isLogoutLoading ? 'Logging out...' : 'Logout'}
            </ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 320,
              maxWidth: 400,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6">Notifications</Typography>
            <Typography variant="caption" color="text.secondary">
              You have 3 unread notifications
            </Typography>
          </Box>
          
          <MenuItem onClick={handleNotificationClose}>
            <ListItemText>
              <Typography variant="body2">New resource added</Typography>
              <Typography variant="caption" color="text.secondary">
                2 minutes ago
              </Typography>
            </ListItemText>
          </MenuItem>
          
          <MenuItem onClick={handleNotificationClose}>
            <ListItemText>
              <Typography variant="body2">System backup completed</Typography>
              <Typography variant="caption" color="text.secondary">
                1 hour ago
              </Typography>
            </ListItemText>
          </MenuItem>
          
          <MenuItem onClick={handleNotificationClose}>
            <ListItemText>
              <Typography variant="body2">5 CVs downloaded</Typography>
              <Typography variant="caption" color="text.secondary">
                3 hours ago
              </Typography>
            </ListItemText>
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleNotificationClose} sx={{ justifyContent: 'center' }}>
            <Typography variant="body2" color="primary">
              View All Notifications
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
