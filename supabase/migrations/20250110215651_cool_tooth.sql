/*
  # Fix Authentication Policies
  
  1. Changes
    - Remove attempts to modify auth schema
    - Focus only on RLS policies for events table
    
  2. Security
    - Public read access for events
    - Authenticated write access for events
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Public read access" ON events;
DROP POLICY IF EXISTS "Authenticated write access" ON events;
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Authenticated users can modify events" ON events;
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by authenticated users" ON events;

-- Create simple policies
CREATE POLICY "Public read access"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access"
  ON events FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Ensure RLS is enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;