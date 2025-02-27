import React from 'react';
import { Message } from '../../../types';

interface PriorityBadgeProps {
  priority: Message['priority'];
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  if (priority !== 'high') return null;

  return (
    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
      High Priority
    </span>
  );
};

export default PriorityBadge;