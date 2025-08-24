'use client';

import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Chip,
  Box,
  OutlinedInput,
  SelectChangeEvent
} from '@mui/material';

export interface FormInputProps {
  name: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
}

// Text Input
export interface FormTextInputProps extends FormInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder,
  helperText,
  type = 'text',
  multiline = false,
  rows = 4,
  maxLength
}) => {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      inputProps={{ maxLength }}
      variant="outlined"
    />
  );
};

// Select Input
export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps extends FormInputProps {
  options: SelectOption[];
  multiple?: boolean;
  renderValue?: (selected: any) => React.ReactNode;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder,
  helperText,
  options,
  multiple = false,
  renderValue
}) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        name={name}
        value={value || (multiple ? [] : '')}
        onChange={handleChange}
        disabled={disabled}
        multiple={multiple}
        renderValue={renderValue}
        input={<OutlinedInput label={label} />}
      >
        {placeholder && !multiple && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Multi-Select with Chips
export const FormMultiSelect: React.FC<FormSelectProps> = (props) => {
  const renderValue = (selected: any[]) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => {
        const option = props.options.find(opt => opt.value === value);
        return (
          <Chip key={value} label={option?.label || value} size="small" />
        );
      })}
    </Box>
  );

  return (
    <FormSelect
      {...props}
      multiple={true}
      renderValue={renderValue}
    />
  );
};

// Checkbox Input
export interface FormCheckboxProps extends Omit<FormInputProps, 'onChange'> {
  onChange: (checked: boolean) => void;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helperText
}) => {
  return (
    <FormControl error={!!error}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            required={required}
          />
        }
        label={label}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Switch Input
export const FormSwitch: React.FC<FormCheckboxProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helperText
}) => {
  return (
    <FormControl error={!!error}>
      <FormControlLabel
        control={
          <Switch
            name={name}
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            required={required}
          />
        }
        label={label}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Radio Group
export interface FormRadioGroupProps extends FormInputProps {
  options: SelectOption[];
  row?: boolean;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helperText,
  options,
  row = false
}) => {
  return (
    <FormControl error={!!error}>
      <FormLabel required={required}>{label}</FormLabel>
      <RadioGroup
        name={name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        row={row}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={disabled || option.disabled}
          />
        ))}
      </RadioGroup>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Date Picker (using standard input for now)
export interface FormDatePickerProps extends FormInputProps {
  minDate?: string;
  maxDate?: string;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helperText,
  minDate,
  maxDate
}) => {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      inputProps={{
        min: minDate,
        max: maxDate
      }}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
    />
  );
};
