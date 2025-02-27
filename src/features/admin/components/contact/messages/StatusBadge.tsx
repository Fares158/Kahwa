import React from 'react';
import { Message } from '../../../types';

interface StatusBadgeProps {
  status: Message['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colors = {
    new: 'bg-blue-100 text-blue-800',
    replied: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;