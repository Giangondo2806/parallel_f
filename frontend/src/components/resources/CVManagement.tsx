'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  IconButton,
  Paper,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  FilePresent as FilePresentIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';

export interface CVFile {
  cvId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

interface CVManagementProps {
  cvFiles: CVFile[];
  onUpload: (file: File) => Promise<void>;
  onDownload: (cvFile: CVFile) => Promise<void>;
  onDelete: (cvId: number) => Promise<void>;
  uploading?: boolean;
  disabled?: boolean;
}

export function CVManagement({
  cvFiles,
  onUpload,
  onDownload,
  onDelete,
  uploading = false,
  disabled = false,
}: CVManagementProps) {
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF, DOC, and DOCX files are allowed');
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    try {
      await onUpload(file);
    } catch (error) {
      console.error('Error uploading CV:', error);
      setError('Failed to upload CV file. Please try again.');
    }
  };

  const handleDownload = async (cvFile: CVFile) => {
    try {
      await onDownload(cvFile);
    } catch (error) {
      console.error('Error downloading CV:', error);
      setError('Failed to download CV file. Please try again.');
    }
  };

  const handleDelete = async (cvId: number, fileName: string) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      try {
        await onDelete(cvId);
      } catch (error) {
        console.error('Error deleting CV:', error);
        setError('Failed to delete CV file. Please try again.');
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader 
        title="CV Files" 
        action={
          <Button
            variant="outlined"
            component="label"
            startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
            disabled={uploading || disabled}
          >
            {uploading ? 'Uploading...' : 'Upload CV'}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </Button>
        }
      />
      <CardContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Supported formats: PDF, DOC, DOCX • Maximum size: 10MB
        </Typography>

        {cvFiles.length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
            No CV files uploaded yet
          </Typography>
        ) : (
          <Stack spacing={2}>
            {cvFiles.map((cvFile) => (
              <Paper key={cvFile.cvId} variant="outlined" sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <FilePresentIcon color="primary" />
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {cvFile.fileName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cvFile.fileType} • {formatFileSize(cvFile.fileSize)} • 
                      Uploaded {new Date(cvFile.uploadedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDownload(cvFile)}
                      title="Download CV"
                      disabled={disabled}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(cvFile.cvId, cvFile.fileName)}
                      title="Delete CV"
                      color="error"
                      disabled={disabled}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
