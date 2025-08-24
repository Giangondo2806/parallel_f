'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  FilePresent as FilePresentIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';
import { ResourceFormData } from '../../../../types/resource.types';
import { CVManagement, CVFile } from '../../../../components/resources/CVManagement';
import { ResourceForm } from '../../../../components/resources/ResourceForm';

// Mock data for form options
const MOCK_DEPARTMENTS = [
  { id: 1, value: '1', name: 'IT Department' },
  { id: 2, value: '2', name: 'QA Department' },
  { id: 3, value: '3', name: 'BA Department' },
  { id: 4, value: '4', name: 'HR Department' },
];

const MOCK_STATUSES = [
  { value: 'Available', label: 'Available' },
  { value: 'Assigned', label: 'Assigned' },
  { value: 'On Leave', label: 'On Leave' },
  { value: 'Training', label: 'Training' },
];

// Mock resource data for editing
const MOCK_RESOURCE_DATA = {
  resourceId: 1,
  employeeCode: 'EMP001',
  fullName: 'Nguyen Van A',
  email: 'nguyen.a@company.com',
  phone: '+84 901 234 567',
  jobTitle: 'Software Engineer',
  skillSet: 'Java, Spring Boot, ReactJS, MySQL',
  departmentId: 1,
  idleFrom: '2025-01-06',
  idleTo: '',
  status: 'Available',
  processNote: 'Contact with client ABC on 01/08, waiting response...\nUpdated skills based on latest training...',
  rate: '500$',
  isUrgent: true,
  cvFiles: [
    {
      cvId: 1,
      fileName: 'nguyen_cv.pdf',
      fileType: 'PDF',
      fileSize: 2048576,
      uploadedAt: '2025-01-10T09:30:00Z',
    },
  ],
};

export default function ResourceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const resourceId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ResourceFormData>({
    employeeCode: '',
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    skillSet: '',
    departmentId: '',
    idleFrom: '',
    idleTo: '',
    status: 'Available',
    processNote: '',
    rate: '',
  });
  const [cvFiles, setCvFiles] = useState<CVFile[]>([]);
  const [isUrgent, setIsUrgent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingCV, setUploadingCV] = useState(false);

  // Load existing resource data
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setFormData({
        employeeCode: MOCK_RESOURCE_DATA.employeeCode,
        fullName: MOCK_RESOURCE_DATA.fullName,
        email: MOCK_RESOURCE_DATA.email,
        phone: MOCK_RESOURCE_DATA.phone || '',
        jobTitle: MOCK_RESOURCE_DATA.jobTitle || '',
        skillSet: MOCK_RESOURCE_DATA.skillSet || '',
        departmentId: MOCK_RESOURCE_DATA.departmentId,
        idleFrom: MOCK_RESOURCE_DATA.idleFrom,
        idleTo: MOCK_RESOURCE_DATA.idleTo || '',
        status: MOCK_RESOURCE_DATA.status,
        processNote: MOCK_RESOURCE_DATA.processNote || '',
        rate: MOCK_RESOURCE_DATA.rate || '',
      });
      setCvFiles(MOCK_RESOURCE_DATA.cvFiles || []);
      setIsUrgent(MOCK_RESOURCE_DATA.isUrgent);
      setLoading(false);
    }, 500);
  }, [resourceId]);

  const handleInputChange = (field: keyof ResourceFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }

    // Calculate urgent status when idle dates change
    if (field === 'idleFrom' || field === 'idleTo') {
      calculateUrgentStatus({
        ...formData,
        [field]: value,
      });
    }
  };

  const calculateUrgentStatus = (data: ResourceFormData) => {
    if (data.idleFrom) {
      const idleFromDate = new Date(data.idleFrom);
      const endDate = data.idleTo ? new Date(data.idleTo) : new Date();
      const diffTime = Math.abs(endDate.getTime() - idleFromDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setIsUrgent(diffDays >= 60); // 2 months = ~60 days
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.employeeCode.trim()) {
      newErrors.employeeCode = 'Employee code is required';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.departmentId) {
      newErrors.departmentId = 'Department is required';
    }
    if (!formData.idleFrom) {
      newErrors.idleFrom = 'Idle from date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Show success message and navigate back
      router.push('/dashboard/resources?saved=true');
    } catch (error) {
      console.error('Error saving resource:', error);
      // TODO: Show error notification
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        // TODO: Implement actual API call
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push('/dashboard/resources?deleted=true');
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  const handleCVUpload = async (file: File) => {
    // Add mock CV file to list
    const newCVFile: CVFile = {
      cvId: cvFiles.length + 1,
      fileName: file.name,
      fileType: file.name.split('.').pop()?.toUpperCase() || 'PDF',
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };
    setCvFiles(prev => [newCVFile, ...prev]);
  };

  const handleCVDownload = async (cvFile: CVFile) => {
    // TODO: Implement actual API call
    console.log('Downloading CV:', cvFile.fileName);
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = cvFile.fileName;
    link.click();
  };

  const handleCVDelete = async (cvId: number) => {
    setCvFiles(prev => prev.filter(cv => cv.cvId !== cvId));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">
          {`Edit Resource - ${formData.fullName || 'Loading...'}`}
        </Typography>
        {isUrgent && (
          <Chip 
            label="URGENT" 
            color="error" 
            variant="filled" 
            icon={<span>🔥</span>}
          />
        )}
      </Box>

      {/* Content using Flexbox Layout */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3,
        '@media (min-width: 960px)': {
          flexDirection: 'row',
        }
      }}>
        {/* Left Column */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          {/* Resource Form */}
          <ResourceForm
            formData={formData}
            onChange={handleInputChange}
            errors={errors}
            departments={MOCK_DEPARTMENTS}
            statuses={MOCK_STATUSES}
            isUrgent={isUrgent}
            showProcessNotes={true}
          />
        </Box>

        {/* Right Column */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          {/* CV Management */}
          <CVManagement
            cvFiles={cvFiles}
            onUpload={handleCVUpload}
            onDownload={handleCVDownload}
            onDelete={handleCVDelete}
            uploading={uploadingCV}
          />
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box display="flex" gap={2} justifyContent="space-between" mt={3}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back to List
        </Button>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update Resource'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
