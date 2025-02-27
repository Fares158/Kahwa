import { Message } from '../../../types';

export const mockMessages: Message[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Reservation Question',
    message: 'Hi, I would like to reserve a table for 6 people this Saturday evening. Do you accept reservations?',
    date: '2024-03-20T10:30:00',
    status: 'new',
    priority: 'normal'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    subject: 'Private Event Inquiry',
    message: 'I am interested in hosting a private event at your venue next month. Could you please provide information about your event packages?',
    date: '2024-03-19T15:45:00',
    status: 'new',
    priority: 'high'
  }
];