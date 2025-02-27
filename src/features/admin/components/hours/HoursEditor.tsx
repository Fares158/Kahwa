import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { BusinessHours } from '../../types';

const defaultHours: BusinessHours[] = [
  { day: 'Monday', open: '07:00', close: '20:00', isClosed: false },
  { day: 'Tuesday', open: '07:00', close: '20:00', isClosed: false },
  { day: 'Wednesday', open: '07:00', close: '20:00', isClosed: false },
  { day: 'Thursday', open: '07:00', close: '20:00', isClosed: false },
  { day: 'Friday', open: '07:00', close: '20:00', isClosed: false },
  { day: 'Saturday', open: '08:00', close: '21:00', isClosed: false },
  { day: 'Sunday', open: '08:00', close: '21:00', isClosed: false },
];

const HoursEditor = () => {
  const [hours, setHours] = useState<BusinessHours[]>(defaultHours);

  const handleHoursChange = (index: number, field: keyof BusinessHours, value: string | boolean) => {
    const newHours = [...hours];
    newHours[index] = { ...newHours[index], [field]: value };
    setHours(newHours);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving hours:', hours);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Business Hours</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
        <div className="space-y-4">
          {hours.map((hour, index) => (
            <div key={hour.day} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="font-medium">{hour.day}</div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={hour.open}
                  onChange={(e) => handleHoursChange(index, 'open', e.target.value)}
                  className="input"
                  disabled={hour.isClosed}
                />
                <span>to</span>
                <input
                  type="time"
                  value={hour.close}
                  onChange={(e) => handleHoursChange(index, 'close', e.target.value)}
                  className="input"
                  disabled={hour.isClosed}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hour.isClosed}
                  onChange={(e) => handleHoursChange(index, 'isClosed', e.target.checked)}
                  id={`closed-${hour.day}`}
                />
                <label htmlFor={`closed-${hour.day}`}>Closed</label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default HoursEditor;