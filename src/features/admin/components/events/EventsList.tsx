import React from 'react';
import { Edit2, Trash2, Eye, Calendar } from 'lucide-react';
import { Event } from '../../../../types/event';
import { formatDate, formatTime } from '../../../../utils/date';
import LoadingSpinner from '../../../../components/shared/LoadingSpinner';

interface EventsListProps {
  events: Event[];
  loading: boolean;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
}

const EventsList = ({ events, loading, onEditEvent, onDeleteEvent }: EventsListProps) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        No events found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y">
      {events.map((event) => (
        <div 
          key={event.id}
          className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-24 h-16 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-medium">{event.title}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{event.views} views</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditEvent(event)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              aria-label="Edit event"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteEvent(event.id)}
              className="p-2 text-red-600 hover:text-red-900 rounded-lg hover:bg-red-50"
              aria-label="Delete event"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;