import React from 'react';
import { Users, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DateRange } from '../../../types/analytics';
import MetricCard from './MetricCard';
import { useVisitorMetrics } from '../../../hooks/useAnalytics';
import LoadingSpinner from '../../../../../components/shared/LoadingSpinner';

interface VisitorMetricsProps {
  dateRange: DateRange;
}

const VisitorMetrics: React.FC<VisitorMetricsProps> = ({ dateRange }) => {
  const { data, loading, error } = useVisitorMetrics(dateRange);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading visitor metrics: {error?.message || 'No data available'}
      </div>
    );
  }

  // Format session duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total Visitors"
        value={data.totalVisitors.toLocaleString()}
        change={`${data.changeFromPrevious.visitors > 0 ? '+' : ''}${data.changeFromPrevious.visitors.toFixed(1)}%`}
        trend={data.changeFromPrevious.visitors >= 0 ? 'up' : 'down'}
        icon={Users}
        tooltip="Total number of website visitors in the selected period"
      />
      
      <MetricCard
        title="Unique Users"
        value={data.uniqueUsers.toLocaleString()}
        change={`${data.changeFromPrevious.users > 0 ? '+' : ''}${data.changeFromPrevious.users.toFixed(1)}%`}
        trend={data.changeFromPrevious.users >= 0 ? 'up' : 'down'}
        icon={Users}
        tooltip="Number of distinct users who visited the website"
      />
      
      <MetricCard
        title="Avg. Session Duration"
        value={formatDuration(data.avgSessionDuration)}
        change={`${data.changeFromPrevious.duration > 0 ? '+' : ''}${data.changeFromPrevious.duration.toFixed(1)}%`}
        trend={data.changeFromPrevious.duration >= 0 ? 'up' : 'down'}
        icon={Clock}
        tooltip="Average time users spend on the website per session"
      />
    </div>
  );
};

export default VisitorMetrics;