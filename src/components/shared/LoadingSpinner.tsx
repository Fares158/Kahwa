import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader2 
        className={cn(
          "h-8 w-8 text-primary animate-spin",
          className
        )} 
      />
    </div>
  );
};

export default LoadingSpinner;