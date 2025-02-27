import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, change, trend, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Icon className="w-5 h-5 text-gray-400" />
        <div className={`flex items-center ${
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
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
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;