import { useState, useEffect, useCallback } from 'react';
import { Event, EventSortOption, EventFilterOption } from '../types/event';
import { supabase } from '../lib/supabase/client';

export function useEvents(
  sort: EventSortOption = 'date-asc',
  filter: EventFilterOption = 'all'
) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);

      let query = supabase.from('events').select('*');

      // Apply filter
      if (filter === 'upcoming') {
        query = query.gte('date', new Date().toISOString().split('T')[0]);
      } else if (filter === 'past') {
        query = query.lt('date', new Date().toISOString().split('T')[0]);
      }

      // Apply sorting
      switch (sort) {
        case 'date-asc':
          if (filter === 'upcoming') {
            // For upcoming events, show nearest first (ascending)
            query = query.order('date', { ascending: true });
          } else {
            // For past events or all events, show most recent first (descending)
            query = query.order('date', { ascending: false });
          }
          break;
        case 'date-desc':
          if (filter === 'upcoming') {
            // For upcoming events, show furthest first (descending)
            query = query.order('date', { ascending: false });
          } else {
            // For past events or all events, show oldest first (ascending)
            query = query.order('date', { ascending: true });
          }
          break;
        case 'title-asc':
          query = query.order('title', { ascending: true });
          break;
        case 'title-desc':
          query = query.order('title', { ascending: false });
          break;
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const formattedEvents = data.map((event) => ({
        id: event.id,
        title: event.title,
        shortDescription: event.short_description,
        description: event.description,
        date: event.date,
        time: event.time,
        image: event.image,
        views: event.views || 0,
        status: new Date(event.date) > new Date() ? 'upcoming' : 'past',
      })) as Event[];

      setEvents(formattedEvents);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(
        err instanceof Error ? err : new Error('Failed to fetch events')
      );
    } finally {
      setLoading(false);
    }
  }, [sort, filter]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const addEvent = async (
    eventData: Omit<Event, 'id' | 'views' | 'status'>
  ) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title: eventData.title,
            short_description: eventData.shortDescription,
            description: eventData.description,
            date: eventData.date,
            time: eventData.time,
            image: eventData.image,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setEvents((prev) => [
        ...prev,
        {
          ...data,
          status: new Date(data.date) > new Date() ? 'upcoming' : 'past',
        } as Event,
      ]);

      return data as Event;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create event');
    }
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          title: updates.title,
          short_description: updates.shortDescription,
          description: updates.description,
          date: updates.date,
          time: updates.time,
          image: updates.image,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id
            ? ({
                ...data,
                status: new Date(data.date) > new Date() ? 'upcoming' : 'past',
              } as Event)
            : event
        )
      );

      return data as Event;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update event');
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);

      if (error) throw error;

      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete event');
    }
  };

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}
