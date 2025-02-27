/*
  # Fix Authentication Setup
  
  1. Changes
    - Remove all previous policies
    - Create clean RLS policies
    - Keep auth schema untouched
    
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
CREATE POLICY "Events read access"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Events write access"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;