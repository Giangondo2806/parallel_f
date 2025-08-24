'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

export interface NotificationMessage {
  id: string;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
}

interface NotificationContextType {
  showNotification: (message: string, severity?: AlertColor, autoHideDuration?: number) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  const showNotification = (
    message: string, 
    severity: AlertColor = 'info', 
    autoHideDuration = 5000
  ) => {
    const id = Date.now().toString();
    const notification: NotificationMessage = {
      id,
      message,
      severity,
      autoHideDuration,
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove notification
    if (autoHideDuration > 0) {
      setTimeout(() => {
        handleClose(id);
      }, autoHideDuration);
    }
  };

  const showError = (message: string) => showNotification(message, 'error', 7000);
  const showSuccess = (message: string) => showNotification(message, 'success', 4000);
  const showWarning = (message: string) => showNotification(message, 'warning', 6000);
  const showInfo = (message: string) => showNotification(message, 'info', 5000);

  const handleClose = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      showNotification,
      showError,
      showSuccess,
      showWarning,
      showInfo,
    }}>
      {children}
      
      {/* Render notifications */}
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          style={{ top: 24 + index * 70 }} // Stack notifications
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};
