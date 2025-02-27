import React from 'react';
import { cn } from '../../../../utils/cn';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
  return <div className="space-y-4">{children}</div>;
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => (
  <div className={cn('flex gap-2 border-b', className)}>{children}</div>
);

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'border-b-2 border-transparent -mb-[2px]',
        'data-[state=active]:border-primary data-[state=active]:text-gray-900',
        className
      )}
      data-state={value === value ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  return <div className="pt-4">{children}</div>;
};