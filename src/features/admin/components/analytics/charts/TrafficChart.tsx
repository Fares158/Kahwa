import React from 'react';
import { DateRange } from '../../../types/analytics';
import { useTrafficData } from '../../../hooks/useAnalytics';
import LoadingSpinner from '../../../../../components/shared/LoadingSpinner';
import ErrorState from '../ErrorState';

interface TrafficChartProps {
  dateRange: DateRange;
}

const TrafficChart: React.FC<TrafficChartProps> = ({ dateRange }) => {
  const { data, loading, error } = useTrafficData(dateRange);

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
        <div className="h-[300px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
        <ErrorState 
          message={error?.message || 'No data available'} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Simple chart rendering with divs
  const maxVisitors = Math.max(...data.map(item => item.visitors));
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
      <div className="h-[300px] relative">
        <div className="absolute inset-0 flex items-end justify-between gap-1 pb-8">
          {data.map((item, index) => {
            const height = (item.visitors / maxVisitors) * 100;
            return (
              <div key={index} className="flex flex-col items-center w-full">
                <div 
                  className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors"
                  style={{ height: `${height}%` }}
                  title={`${item.date}: ${item.visitors} visitors`}
                ></div>
                <div className="text-xs text-gray-500 mt-2 rotate-45 origin-left">
                  {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-200"></div>
      </div>
    </div>
  );
};

export default TrafficChart;