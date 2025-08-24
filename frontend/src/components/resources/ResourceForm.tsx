'use client';

import { useState, useEffect } from 'react';
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
  Typography,
  Chip,
} from '@mui/material';
import { ResourceFormData } from '../../types/resource.types';

interface FormOption {
  id?: number;
  value: string;
  label?: string;
  name?: string;
}

interface ResourceFormProps {
  formData: ResourceFormData;
  onChange: (field: keyof ResourceFormData, value: string | number) => void;
  errors?: Record<string, string>;
  departments?: FormOption[];
  statuses?: FormOption[];
  isUrgent?: boolean;
  readOnly?: boolean;
  showProcessNotes?: boolean;
}

// Mock data fallbacks
const DEFAULT_DEPARTMENTS = [
  { id: 1, name: 'IT Department', value: 'IT Department' },
  { id: 2, name: 'QA Department', value: 'QA Department' },
  { id: 3, name: 'BA Department', value: 'BA Department' },
  { id: 4, name: 'HR Department', value: 'HR Department' },
];

const DEFAULT_STATUSES = [
  { value: 'Available', label: 'Available' },
  { value: 'Assigned', label: 'Assigned' },
  { value: 'On Leave', label: 'On Leave' },
  { value: 'Training', label: 'Training' },
];

export function ResourceForm({
  formData,
  onChange,
  errors = {},
  departments = DEFAULT_DEPARTMENTS,
  statuses = DEFAULT_STATUSES,
  isUrgent = false,
  readOnly = false,
  showProcessNotes = true,
}: ResourceFormProps) {
  const [idleDuration, setIdleDuration] = useState<string>('');

  // Calculate idle duration when dates change
  useEffect(() => {
    if (formData.idleFrom) {
      const idleFromDate = new Date(formData.idleFrom);
      const endDate = formData.idleTo ? new Date(formData.idleTo) : new Date();
      const diffTime = Math.abs(endDate.getTime() - idleFromDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        setIdleDuration(`${diffDays} days`);
      } else {
        const months = Math.floor(diffDays / 30);
        const remainingDays = diffDays % 30;
        setIdleDuration(`${months} month${months > 1 ? 's' : ''} ${remainingDays} days`);
      }
    } else {
      setIdleDuration('');
    }
  }, [formData.idleFrom, formData.idleTo]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Basic Information */}
      <Card>
        <CardHeader title="Basic Information" />
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Employee Code"
              value={formData.employeeCode}
              onChange={(e) => onChange('employeeCode', e.target.value)}
              error={!!errors.employeeCode}
              helperText={errors.employeeCode}
              required
              fullWidth
              disabled={readOnly}
            />
            <TextField
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              required
              fullWidth
              disabled={readOnly}
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              required
              fullWidth
              disabled={readOnly}
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              fullWidth
              disabled={readOnly}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Work Information */}
      <Card>
        <CardHeader title="Work Information" />
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <FormControl fullWidth required error={!!errors.departmentId}>
              <InputLabel>Department</InputLabel>
              <Select
                value={formData.departmentId}
                onChange={(e) => onChange('departmentId', e.target.value as number)}
                label="Department"
                disabled={readOnly}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.departmentId && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.departmentId}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Job Title"
              value={formData.jobTitle}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              fullWidth
              disabled={readOnly}
            />
            <TextField
              label="Skills"
              value={formData.skillSet}
              onChange={(e) => onChange('skillSet', e.target.value)}
              multiline
              rows={2}
              fullWidth
              placeholder="e.g., Java, Spring Boot, ReactJS, MySQL"
              disabled={readOnly}
              sx={{ gridColumn: { xs: 'span 1', sm: 'span 2' } }}
            />
            <TextField
              label="Rate"
              value={formData.rate}
              onChange={(e) => onChange('rate', e.target.value)}
              fullWidth
              placeholder="e.g., 500$"
              disabled={readOnly}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Idle Information */}
      <Card>
        <CardHeader title="Idle Information" />
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Idle From"
              type="date"
              value={formData.idleFrom}
              onChange={(e) => onChange('idleFrom', e.target.value)}
              error={!!errors.idleFrom}
              helperText={errors.idleFrom}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={readOnly}
            />
            <TextField
              label="Idle To"
              type="date"
              value={formData.idleTo}
              onChange={(e) => onChange('idleTo', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={readOnly}
            />
            {idleDuration && (
              <Box sx={{ gridColumn: 'span 1' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Duration: {idleDuration}
                </Typography>
              </Box>
            )}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => onChange('status', e.target.value)}
                label="Status"
                disabled={readOnly}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ gridColumn: 'span 1' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Urgent Status
              </Typography>
              <Chip 
                label={isUrgent ? 'URGENT (≥2 months idle)' : 'Normal'} 
                color={isUrgent ? 'error' : 'default'}
                variant="outlined"
                icon={isUrgent ? <span>🔥</span> : undefined}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Process Notes - Only show if enabled */}
      {showProcessNotes && (
        <Card>
          <CardHeader title="Process Notes (Admin/RA only)" />
          <CardContent>
            <TextField
              label="Process Notes"
              value={formData.processNote}
              onChange={(e) => onChange('processNote', e.target.value)}
              multiline
              rows={6}
              fullWidth
              placeholder="Add notes about contact with clients, updates, etc..."
              disabled={readOnly}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Internal notes visible only to Admin and RA users
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
