import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import EventModal from './EventModal';
import { useEvents } from '../../hooks/useEvents';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Event } from '../../types/event';
import { ChevronRight } from 'lucide-react';

const HomeEvents: React.FC = () => {
  const { t } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { events, loading, error } = useEvents('date-asc', 'upcoming');

  // Get the next upcoming event (first one since they're sorted by date)
  const nextEvent = events[0];

  if (loading) {
    return (
      <section className="relative py-16" id="events">
        <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDLRGJFKSmoXRQ51TvzcNI-PiHoVDc8EUGJhB1MB3TfJDnfgfXpAAHguhJZGdgLgUoX0&usqp=CAU')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>
        <div className="container-custom relative">
          <h2 className="heading-2 text-center mb-8 text-primary">
            {t('events.title')}
          </h2>
          <p className="text-center text-white/90 mb-8">
            {t('events.subtitle')}
          </p>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-16" id="events">
        <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDLRGJFKSmoXRQ51TvzcNI-PiHoVDc8EUGJhB1MB3TfJDnfgfXpAAHguhJZGdgLgUoX0&usqp=CAU')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>
        <div className="container-custom relative">
          <h2 className="heading-2 text-center mb-8 text-primary">
            {t('events.title')}
          </h2>
          <p className="text-center text-white/90 mb-8">
            {t('events.subtitle')}
          </p>
          <div className="text-center text-red-400 p-4 rounded-lg bg-red-900/20">
            {t('events.error')}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16" id="events">
      <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDLRGJFKSmoXRQ51TvzcNI-PiHoVDc8EUGJhB1MB3TfJDnfgfXpAAHguhJZGdgLgUoX0&usqp=CAU')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>
      <div className="container-custom relative">
        <h2 className="heading-2 text-center mb-8 text-primary">
          {t('events.title')}
        </h2>
        <p className="text-center text-white/90 mb-8">{t('events.subtitle')}</p>

        {!nextEvent ? (
          <div className="text-center">
            <p className="text-white/70 mb-4">{t('events.noupcoming')}</p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('events.ViewAllEvents')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <EventCard
              event={nextEvent}
              onClick={() => setSelectedEvent(nextEvent)}
            />
            <div className="mt-8 text-center">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {t('events.ViewAllEvents')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
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

export default HomeEvents;
