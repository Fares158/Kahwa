import React from 'react';
import { cn } from '../../utils/cn';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}

const FormField = ({ label, children, error, className }: FormFieldProps) => {
  return (
    <div className={cn('space-y-1', className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;