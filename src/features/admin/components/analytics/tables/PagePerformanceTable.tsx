import React from 'react';
import { Clock, Users } from 'lucide-react';
import { DateRange } from '../../../types/analytics';
import { usePageMetrics } from '../../../hooks/useAnalytics';
import LoadingSpinner from '../../../../../components/shared/LoadingSpinner';
import ErrorState from '../ErrorState';

interface PagePerformanceTableProps {
  dateRange: DateRange;
}

const PagePerformanceTable: React.FC<PagePerformanceTableProps> = ({ dateRange }) => {
  const { data, loading, error } = usePageMetrics(dateRange);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Page Performance</h3>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Page Performance</h3>
        <ErrorState 
          message={error?.message || 'No data available'} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Format time in seconds to minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Page Performance</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Page</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Visits</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Avg. Time</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Bounce Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((page) => (
              <tr key={page.path} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{page.title}</div>
                    <div className="text-sm text-gray-500">{page.path}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    {page.visits.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {formatTime(page.avgTime)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">{page.bounceRate.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagePerformanceTable;