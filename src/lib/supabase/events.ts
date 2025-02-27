import { supabase } from './client';
import type { Event } from '../../types/event';
import { isUpcoming } from '../../utils/date';

export interface EventInput {
  title: string;
  shortDescription: string;
  description: string;
  date: string;
  time: string;
  image: string;
}

export async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }

  // Transform the data to match our Event type
  return data.map((event) => ({
    id: event.id,
    title: event.title,
    shortDescription: event.short_description,
    description: event.description,
    date: event.date,
    time: event.time,
    image: event.image,
    views: event.views || 0,
    status: isUpcoming(event.date) ? 'upcoming' : 'past',
  })) as Event[];
}

export async function createEvent(event: EventInput) {
  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        title: event.title,
        short_description: event.shortDescription,
        description: event.description,
        date: event.date,
        time: event.time,
        image: event.image,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event');
  }

  return {
    id: data.id,
    title: data.title,
    shortDescription: data.short_description,
    description: data.description,
    date: data.date,
    time: data.time,
    image: data.image,
    views: data.views || 0,
    status: isUpcoming(data.date) ? 'upcoming' : 'past',
  } as Event;
}

export async function updateEvent(id: string, event: Partial<EventInput>) {
  const { data, error } = await supabase
    .from('events')
    .update({
      title: event.title,
      short_description: event.shortDescription,
      description: event.description,
      date: event.date,
      time: event.time,
      image: event.image,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    throw new Error('Failed to update event');
  }

  return {
    id: data.id,
    title: data.title,
    shortDescription: data.short_description,
    description: data.description,
    date: data.date,
    time: data.time,
    image: data.image,
    views: data.views || 0,
    status: isUpcoming(data.date) ? 'upcoming' : 'past',
  } as Event;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw new Error('Failed to delete event');
  }
}

export function subscribeToEvents(callback: (event: Event) => void) {
  const subscription = supabase
    .channel('events')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'events' },
      (payload) => {
        if (payload.eventType === 'DELETE') {
          callback({ id: payload.old.id } as Event);
          return;
        }

        const event = {
          id: payload.new.id,
          title: payload.new.title,
          shortDescription: payload.new.short_description,
          description: payload.new.description,
          date: payload.new.date,
          time: payload.new.time,
          image: payload.new.image,
          views: payload.new.views || 0,
          status: isUpcoming(payload.new.date) ? 'upcoming' : 'past',
        } as Event;
        callback(event);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}
