'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
  Chip,
  Collapse
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  History as HistoryIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  FolderOpen as FolderOpenIcon,
  PersonAdd as PersonAddIcon,
  ListAlt as ListAltIcon
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
  width?: number;
}

interface MenuItemType {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  roles: string[];
  badge?: string | number;
  children?: MenuItemType[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  onClose, 
  variant = 'permanent',
  width = 280 
}) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['resources']);

  // Define menu items with role-based access
  const menuItems: MenuItemType[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
      roles: ['admin', 'ra', 'manager', 'viewer']
    },
    {
      id: 'resources',
      label: 'Idle Resources',
      icon: <AssignmentIcon />,
      path: '/dashboard/resources',
      roles: ['admin', 'ra', 'manager', 'viewer'],
      badge: '125',
      children: [
        {
          id: 'resources-list',
          label: 'Resource List',
          icon: <ListAltIcon />,
          path: '/dashboard/resources',
          roles: ['admin', 'ra', 'manager', 'viewer']
        },
        {
          id: 'resources-add',
          label: 'Add Resource',
          icon: <PersonAddIcon />,
          path: '/dashboard/resources/add',
          roles: ['admin', 'ra', 'manager']
        }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: <PeopleIcon />,
      path: '/dashboard/users',
      roles: ['admin'],
      badge: '25'
    },
    {
      id: 'history',
      label: 'Update History',
      icon: <HistoryIcon />,
      path: '/dashboard/history',
      roles: ['admin', 'ra', 'manager']
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <AssessmentIcon />,
      path: '/dashboard/reports',
      roles: ['admin', 'ra', 'manager']
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      path: '/dashboard/settings',
      roles: ['admin', 'ra', 'manager', 'viewer']
    }
  ];

  const hasAccess = (roles: string[]): boolean => {
    if (!user || !user.role) return false;
    return roles.includes(user.role.toLowerCase());
  };

  const isActiveRoute = (path: string): boolean => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  const handleItemClick = (item: MenuItemType) => {
    if (item.children) {
      // Toggle expand/collapse for parent items
      setExpandedItems(prev => 
        prev.includes(item.id) 
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    } else {
      // Navigate to the route
      router.push(item.path);
      if (variant === 'temporary' && onClose) {
        onClose();
      }
    }
  };

  const renderMenuItem = (item: MenuItemType, level: number = 0) => {
    if (!hasAccess(item.roles)) {
      return null;
    }

    const isActive = isActiveRoute(item.path);
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            selected={isActive && !hasChildren}
            sx={{
              pl: 2 + level * 2,
              borderRadius: '0 25px 25px 0',
              mx: 1,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              },
              '&:hover': {
                backgroundColor: isActive ? 'primary.main' : 'action.hover',
                borderRadius: '0 25px 25px 0',
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 40,
                color: isActive && !hasChildren ? 'inherit' : 'text.secondary'
              }}
            >
              {item.icon}
            </ListItemIcon>
            
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontSize: level > 0 ? '0.875rem' : '0.95rem',
                fontWeight: isActive && !hasChildren ? 600 : 500
              }}
            />
            
            {/* Badge for counts */}
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.75rem',
                  bgcolor: isActive && !hasChildren ? 'rgba(255,255,255,0.2)' : 'primary.light',
                  color: isActive && !hasChildren ? 'white' : 'primary.contrastText'
                }}
              />
            )}
            
            {/* Expand/Collapse Icon */}
            {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {/* Render children */}
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar />
      
      {/* User Info Section */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        {user ? (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Logged in as
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {user.fullName || user.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typeof user.department === 'object' && user.department ? user.department.departmentName : user.department || 'No Department'}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Loading user info...
          </Typography>
        )}
      </Box>
      
      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ pt: 1 }}>
          {menuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>
      
      {/* Footer Section */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" display="block">
          IRMS v1.0.0
        </Typography>
        <Typography variant="caption" color="text.secondary">
          FJP © 2025
        </Typography>
      </Box>
    </Box>
  );

  if (variant === 'temporary') {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
            borderRight: '1px solid',
            borderColor: 'divider'
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant={variant}
      open={open}
      sx={{
        width: open ? width : 0,
        flexShrink: 0,
        display: { xs: 'none', lg: 'block' },
        transition: theme => theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative', // Change from fixed to relative
          '& .MuiListItemIcon-root': {
            color: 'rgba(255,255,255,0.8)'
          },
          '& .MuiListItemText-primary': {
            color: 'white'
          },
          '& .MuiDivider-root': {
            borderColor: 'rgba(255,255,255,0.12)'
          }
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
