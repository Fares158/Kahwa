import React, { useState } from 'react';
import { Send, Archive, Flag, Trash2, MessageSquare } from 'lucide-react';
import Card from '../../../../../components/shared/Card';
import { Message } from '../../../types';

interface MessageDetailProps {
  message: Message | null;
  onStatusChange: (messageId: string, status: Message['status']) => void;
  onDelete: (messageId: string) => void;
  onPriorityToggle: (messageId: string) => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({
  message,
  onStatusChange,
  onDelete,
  onPriorityToggle
}) => {
  const [reply, setReply] = useState('');

  const handleSendReply = () => {
    if (!message || !reply.trim()) return;
    onStatusChange(message.id, 'replied');
    setReply('');
  };

  if (!message) {
    return (
      <Card>
        <div className="text-center py-12 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Select a message to view details and reply</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{message.subject}</h3>
            <p className="text-sm text-gray-600">
              From: {message.name} ({message.email})
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPriorityToggle(message.id)}
              className={`p-2 rounded-lg ${
                message.priority === 'high'
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Toggle priority"
            >
              <Flag className="w-4 h-4" />
            </button>
            <button
              onClick={() => onStatusChange(message.id, 'archived')}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              title="Archive"
            >
              <Archive className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(message.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="whitespace-pre-wrap">{message.message}</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Reply</h4>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="input min-h-[120px]"
            placeholder="Type your reply..."
          />
          <div className="flex justify-end">
            <button
              onClick={handleSendReply}
              className="btn-primary flex items-center gap-2"
              disabled={!reply.trim()}
            >
              <Send className="w-4 h-4" />
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MessageDetail;