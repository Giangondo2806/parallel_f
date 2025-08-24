'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

// Base Modal
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  fullScreen?: boolean;
  actions?: React.ReactNode;
  hideCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  fullScreen = false,
  actions,
  hideCloseButton = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen || isMobile}
    >
      {title && (
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            {!hideCloseButton && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
      )}
      
      <DialogContent>
        {children}
      </DialogContent>
      
      {actions && (
        <>
          <Divider />
          <DialogActions sx={{ p: 2 }}>
            {actions}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

// Confirmation Modal
export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  loading = false
}) => {
  const actions = (
    <>
      <Button onClick={onClose} disabled={loading}>
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color={confirmColor}
        disabled={loading}
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      actions={actions}
      hideCloseButton={loading}
    >
      <Typography variant="body1">
        {message}
      </Typography>
    </Modal>
  );
};

// Alert Modal
export interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  buttonText?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  open,
  onClose,
  title,
  message,
  type = 'info',
  buttonText = 'OK'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircleIcon color="success" sx={{ mr: 1 }} />;
      case 'error': return <ErrorIcon color="error" sx={{ mr: 1 }} />;
      case 'warning': return <WarningIcon color="warning" sx={{ mr: 1 }} />;
      case 'info': return <InfoIcon color="info" sx={{ mr: 1 }} />;
      default: return null;
    }
  };

  const actions = (
    <Button onClick={onClose} variant="contained" color="primary">
      {buttonText}
    </Button>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      actions={actions}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {getIcon()}
        <Typography variant="body1">
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

// Form Modal
export interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Save',
  cancelText = 'Cancel',
  loading = false,
  maxWidth = 'sm'
}) => {
  const actions = (
    <>
      <Button onClick={onClose} disabled={loading}>
        {cancelText}
      </Button>
      <Button
        onClick={onSubmit}
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {submitText}
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth={maxWidth}
      actions={actions}
      hideCloseButton={loading}
    >
      {children}
    </Modal>
  );
};

export default Modal;
