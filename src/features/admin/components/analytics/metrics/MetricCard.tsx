import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  tooltip?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  tooltip
}) => {
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm"
      title={tooltip}
    >
      <div className="flex items-center justify-between">
        <Icon className="w-5 h-5 text-gray-400" />
        <div className={cn(
          'flex items-center',
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        )}>
          {change}
          {trend === 'up' ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;