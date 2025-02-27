import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/date';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div 
      className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="relative aspect-[16/9]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {event.status === 'past' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium px-3 py-1 rounded-full border border-white/50">
              Past Event
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-base font-semibold mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{event.time}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-600 line-clamp-2">
          {event.shortDescription}
        </p>
      </div>
    </div>
  );
};

export default EventCard;