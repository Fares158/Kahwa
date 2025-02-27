import React from 'react';

interface LoadingStateProps {
  height?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ height = '300px' }) => {
  return (
    <div 
      className="animate-pulse bg-gray-100 rounded-lg"
      style={{ height }}
    />
  );
};

export default LoadingState;