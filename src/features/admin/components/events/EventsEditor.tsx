import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import EventsList from './EventsList';
import EventForm from './EventForm';
import { Event } from '../../../../types/event';
import { useEvents } from '../../../../hooks/useEvents';
import PageHeader from '../../../../components/shared/PageHeader';

const EventsEditor = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sort, setSort] = useState('date-desc');
  const [filter, setFilter] = useState('upcoming');

  const { events, loading, error, addEvent, updateEvent, deleteEvent } = useEvents(sort, filter);

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = async (data: Partial<Event>) => {
    try {
      if (!data.title || !data.shortDescription || !data.description || 
          !data.date || !data.time || !data.image) {
        throw new Error('All fields are required');
      }

      if (selectedEvent) {
        await updateEvent(selectedEvent.id, data);
        toast.success('Event updated successfully');
      } else {
        await addEvent(data);
        toast.success('Event created successfully');
      }
      handleCloseForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save event';
      toast.error(errorMessage);
      throw error; // Re-throw to let the form component handle the error state
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await deleteEvent(id);
      toast.success('Event deleted successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete event';
      toast.error(errorMessage);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading events: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Events Management">
        <div className="flex items-center gap-4">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input py-2"
          >
            <option value="date-desc">Latest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input py-2"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>

          <button
            onClick={handleAddEvent}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>
      </PageHeader>

      <EventsList
        events={events}
        loading={loading}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />
      
      {isFormOpen && (
        <EventForm
          event={selectedEvent}
          onClose={handleCloseForm}
          onSubmit={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default EventsEditor;