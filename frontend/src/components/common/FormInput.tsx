import React from 'react';

interface FormInputProps {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'email';
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
  className = '',
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};
