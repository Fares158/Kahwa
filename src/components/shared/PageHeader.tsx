import React from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const PageHeader = ({ title, children, className }: PageHeaderProps) => {
  return (
    <div className={cn('flex justify-between items-center mb-6', className)}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default PageHeader;