import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm p-6', className)}>
      {children}
    </div>
  );
};

export default Card;