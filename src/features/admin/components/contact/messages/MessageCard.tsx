import React from 'react';
import { Message } from '../../../types';
import { formatDate } from '../../../utils/date';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

interface MessageCardProps {
  message: Message;
  isSelected: boolean;
  onSelect: () => void;
  onStatusChange: (messageId: string, status: Message['status']) => void;
  onDelete: (messageId: string) => void;
  onPriorityToggle: (messageId: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isSelected,
  onSelect,
  onStatusChange,
  onDelete,
  onPriorityToggle
}) => {
  return (
    <div
      className={`py-4 cursor-pointer hover:bg-gray-50 ${
        isSelected ? 'bg-gray-50' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{message.name}</h4>
          <p className="text-sm text-gray-600">{message.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={message.priority} />
          <StatusBadge status={message.status} />
        </div>
      </div>
      <h5 className="font-medium text-gray-900 mb-1">{message.subject}</h5>
      <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
      <p className="text-xs text-gray-500 mt-2">
        {formatDate(message.date)}
      </p>
    </div>
  );
};

export default MessageCard;