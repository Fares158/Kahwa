import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const RealTimeVisitors = () => {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 50) + 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary/10 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Users className="w-5 h-5 text-primary" />
        <div>
          <div className="text-sm font-medium">Active Users</div>
          <div className="text-2xl font-semibold">{activeUsers}</div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeVisitors;