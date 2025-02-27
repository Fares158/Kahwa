import React from 'react';
import { Users, Coffee, Star, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import StatsCard from './dashboard/StatsCard';
import ActivityFeed from './dashboard/ActivityFeed';
import QuickActions from './dashboard/QuickActions';

const stats = [
  {
    label: 'Total Orders',
    value: '156',
    change: '+12.5%',
    trend: 'up',
    icon: Coffee
  },
  {
    label: 'Active Users',
    value: '2,451',
    change: '+4.2%',
    trend: 'up',
    icon: Users
  },
  {
    label: 'Reviews',
    value: '4.8',
    change: '-0.1',
    trend: 'down',
    icon: Star
  },
  {
    label: 'Revenue',
    value: '$12,454',
    change: '+8.3%',
    trend: 'up',
    icon: TrendingUp
  }
];

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardOverview;