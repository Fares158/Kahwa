import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useLanguage } from '../contexts/LanguageContext';
import EventCard from '../components/Events/EventCard';
import EventModal from '../components/Events/EventModal';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import type { Event } from '../types/event';

const Events: React.FC = () => {
  const { t } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  
  const { events, loading, error } = useEvents('date-asc', filter);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50" id="events">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-8">
            {t('events.title')}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {t('events.subtitle')}
          </p>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50" id="events">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-8">
            {t('events.title')}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {t('events.subtitle')}
          </p>
          <div className="text-center text-red-600 p-4 rounded-lg bg-red-50">
            {t('events.error')}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50" id="events">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-8">{t('events.title')}</h2>
        <p className="text-center text-gray-600 mb-8">{t('events.subtitle')}</p>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === 'upcoming'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t('events.filter.upcoming')}
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === 'past'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t('events.filter.past')}
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">{t('events.noEvents')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        )}

        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Events;