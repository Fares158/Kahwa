/*
  # Fix authentication system
  
  1. Changes
    - Remove all role-related columns and references
    - Reset auth schema to default state
    - Set up proper JWT handling
    
  2. Security
    - Maintain RLS with simple policies
    - Use standard auth.uid() checks
*/

-- First, drop all custom auth-related objects
DROP FUNCTION IF EXISTS auth.is_admin() CASCADE;
DROP FUNCTION IF EXISTS auth.is_authenticated() CASCADE;
DROP FUNCTION IF EXISTS is_admin() CASCADE;

-- Remove any custom types
DROP TYPE IF EXISTS auth.role CASCADE;
DROP TYPE IF EXISTS custom_types.user_role CASCADE;
DROP SCHEMA IF EXISTS custom_types CASCADE;

-- Clean up auth.users table
ALTER TABLE IF EXISTS auth.users 
  DROP COLUMN IF EXISTS role CASCADE;

-- Reset auth schema settings
ALTER TABLE auth.users 
  ALTER COLUMN raw_app_meta_data SET DEFAULT '{"provider":"email","providers":["email"]}';

-- Drop all existing policies
DROP POLICY IF EXISTS "Public read access" ON events;
DROP POLICY IF EXISTS "Authenticated write access" ON events;
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by authenticated users" ON events;

-- Create simple policies
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

-- Reset JWT settings
SELECT set_config('auth.jwt_exp', '3600'::text, false);  -- 1 hour expiration
SELECT set_config('auth.jwt_refresh_exp', '86400'::text, false);  -- 24 hour refresh