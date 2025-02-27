import React from 'react';
import Card from '../../../../../components/shared/Card';
import { Message } from '../../../types';
import MessageCard from './MessageCard';

interface MessageListProps {
  messages: Message[];
  selectedMessage: Message | null;
  onSelectMessage: (message: Message) => void;
  onStatusChange: (messageId: string, status: Message['status']) => void;
  onDelete: (messageId: string) => void;
  onPriorityToggle: (messageId: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  selectedMessage,
  onSelectMessage,
  onStatusChange,
  onDelete,
  onPriorityToggle
}) => {
  return (
    <Card>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Messages</h3>
        <div className="divide-y">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              isSelected={selectedMessage?.id === message.id}
              onSelect={() => onSelectMessage(message)}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onPriorityToggle={onPriorityToggle}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MessageList;