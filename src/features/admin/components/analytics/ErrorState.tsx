import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Failed to load data', 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-gray-500">
      <AlertTriangle className="w-8 h-8 mb-2 text-red-500" />
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="text-primary hover:text-primary/80"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;