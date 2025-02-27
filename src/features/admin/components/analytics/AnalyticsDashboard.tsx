import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import DateRangeSelector from './DateRangeSelector';
import VisitorMetrics from './metrics/VisitorMetrics';
import TrafficChart from './charts/TrafficChart';
import TrafficSourcesChart from './charts/TrafficSourcesChart';
import PagePerformanceTable from './tables/PagePerformanceTable';
import RealTimeVisitors from './realtime/RealTimeVisitors';
import ExportButton from './ExportButton';
import { DateRange } from '../../types/analytics';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          <ExportButton />
        </div>
      </div>

      {/* Real-time stats */}
      <RealTimeVisitors />

      {/* Visitor metrics */}
      <VisitorMetrics dateRange={dateRange} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficChart dateRange={dateRange} />
        <TrafficSourcesChart dateRange={dateRange} />
      </div>

      {/* Page performance */}
      <PagePerformanceTable dateRange={dateRange} />
    </div>
  );
};

export default AnalyticsDashboard;