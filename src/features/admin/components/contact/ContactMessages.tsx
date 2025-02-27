import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Card from '../../../../components/shared/Card';
import MessageList from './messages/MessageList';
import MessageDetail from './messages/MessageDetail';
import { Message } from '../../types';
import { mockMessages } from './messages/mockData';

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleStatusChange = (messageId: string, status: Message['status']) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, status } : msg
    ));
  };

  const handleDelete = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handlePriorityToggle = (messageId: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? {
        ...msg,
        priority: msg.priority === 'normal' ? 'high' : 'normal'
      } : msg
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MessageList
        messages={messages}
        selectedMessage={selectedMessage}
        onSelectMessage={setSelectedMessage}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onPriorityToggle={handlePriorityToggle}
      />
      
      <MessageDetail
        message={selectedMessage}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onPriorityToggle={handlePriorityToggle}
      />
    </div>
  );
};

export default ContactMessages;