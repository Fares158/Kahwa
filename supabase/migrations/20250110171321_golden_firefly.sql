/*
  # Fix Events Table Policies
  
  1. Changes
    - Remove admin role dependency
    - Simplify policies to use authenticated status only
    - Keep public read access
    
  2. Security
    - Enable RLS
    - Allow public read access
    - Restrict write operations to authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by authenticated users" ON events;
DROP POLICY IF EXISTS "Admin users have full access" ON events;
DROP POLICY IF EXISTS "Events are modifiable by admins" ON events;

-- Create simplified policies
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can modify events"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;