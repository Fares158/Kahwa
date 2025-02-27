/*
  # Clean up and simplify authentication

  1. Changes
    - Remove all custom role types and complex role management
    - Simplify policies to use basic authenticated/public access
    - Clean up any conflicting policies
    - Remove attempts to modify auth.users table

  2. Security
    - Enable RLS on events table
    - Allow public read access to events
    - Allow authenticated users to modify events
    - Add helper function for checking authentication
*/

-- Drop any existing policies
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by admins" ON events;
DROP POLICY IF EXISTS "Events are modifiable by authenticated users" ON events;
DROP POLICY IF EXISTS "Allow full access to admins" ON events;

-- Create basic policies
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Events are modifiable by authenticated users"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Helper function for checking authentication
CREATE OR REPLACE FUNCTION auth.is_authenticated()
RETURNS boolean AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure RLS is enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;