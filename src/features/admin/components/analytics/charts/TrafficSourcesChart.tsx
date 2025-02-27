import React from 'react';
import { DateRange } from '../../../types/analytics';
import { useTrafficSources } from '../../../hooks/useAnalytics';
import LoadingSpinner from '../../../../../components/shared/LoadingSpinner';
import ErrorState from '../ErrorState';

interface TrafficSourcesChartProps {
  dateRange: DateRange;
}

const TrafficSourcesChart: React.FC<TrafficSourcesChartProps> = ({ dateRange }) => {
  const { data, loading, error } = useTrafficSources(dateRange);

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
        <div className="h-[300px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
        <ErrorState 
          message={error?.message || 'No data available'} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Generate colors for the chart
  const colors = ['#E5B94C', '#8B4513', '#1A1A1A', '#5D4037', '#795548'];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-[200px] flex items-center justify-center">
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative">
            {data.map((source, index) => {
              // Calculate the segment size and position
              const previousSegments = data
                .slice(0, index)
                .reduce((sum, item) => sum + item.percentage, 0);
              
              return (
                <div 
                  key={source.source}
                  className="absolute inset-0"
                  style={{
                    background: colors[index % colors.length],
                    clipPath: `conic-gradient(from ${previousSegments * 3.6}deg, transparent ${previousSegments * 3.6}deg, currentColor ${previousSegments * 3.6}deg, currentColor ${(previousSegments + source.percentage) * 3.6}deg, transparent ${(previousSegments + source.percentage) * 3.6}deg)`,
                    color: colors[index % colors.length]
                  }}
                  title={`${source.source}: ${source.percentage}%`}
                ></div>
              );
            })}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[120px] h-[120px] bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="space-y-3">
            {data.map((source, index) => (
              <div key={source.source} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-sm" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <div className="flex-1">{source.source}</div>
                <div className="font-medium">{source.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficSourcesChart;