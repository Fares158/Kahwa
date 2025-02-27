/*
  # Final Authentication Fix

  1. Changes
    - Remove all attempts to modify auth schema
    - Remove all custom roles and types
    - Use Supabase's built-in authentication
    - Simplify RLS policies

  2. Security
    - Enable RLS on events table
    - Allow public read access
    - Allow authenticated users to modify events
*/

-- Drop any existing policies
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by admins" ON events;
DROP POLICY IF EXISTS "Events are modifiable by authenticated users" ON events;
DROP POLICY IF EXISTS "Allow full access to admins" ON events;

-- Drop any existing custom types and functions
DROP FUNCTION IF EXISTS auth.is_admin() CASCADE;
DROP FUNCTION IF EXISTS auth.is_authenticated() CASCADE;
DROP TYPE IF EXISTS custom_types.user_role CASCADE;
DROP SCHEMA IF EXISTS custom_types CASCADE;

-- Create basic policies
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Events are modifiable by authenticated users"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;