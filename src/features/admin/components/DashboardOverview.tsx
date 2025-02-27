import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { DateRange } from '../types/analytics';
import AnalyticsDashboard from './analytics/AnalyticsDashboard';

const DashboardOverview: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <button
          onClick={() => setDateRange('7d')}
          className="btn-secondary flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Reset Filters
        </button>
      </div>

      <AnalyticsDashboard dateRange={dateRange} />
    </div>
  );
}

export default DashboardOverview;