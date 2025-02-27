import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing environment variable: VITE_SUPABASE_URL');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: VITE_SUPABASE_ANON_KEY');
}

// Create a single instance of the Supabase client
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: { 'x-application-name': 'the-cast' }
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
);

// Set up error handling for realtime subscriptions
const channel = supabase.channel('system')
  .on('system', { event: '*' }, (payload) => {
    if (payload.type === 'error') {
      console.error('Supabase realtime error:', payload);
      // Attempt to reconnect
      channel.subscribe((status) => {
        console.log('Reconnection status:', status);
      });
    }
  })
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log('Connected to Supabase realtime');
    }
    if (status === 'CHANNEL_ERROR') {
      console.error('Failed to connect to Supabase realtime');
    }
    if (status === 'CLOSED') {
      console.log('Disconnected from Supabase realtime');
    }
  });

export { channel };