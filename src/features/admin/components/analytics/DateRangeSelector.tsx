import React from 'react';
import { Calendar } from 'lucide-react';
import { DateRange } from '../../types/analytics';

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DateRange)}
        className="input py-1"
      >
        <option value="1d">Today</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="custom">Custom range</option>
      </select>
    </div>
  );
};

export default DateRangeSelector;