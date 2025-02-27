import React from 'react';
import { cn } from '../../../utils/cn';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ 
  title, 
  children, 
  className 
}) => {
  return (
    <section className={cn('space-y-4', className)}>
      <h2 className="text-lg font-semibold text-white font-mono">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default FooterSection;