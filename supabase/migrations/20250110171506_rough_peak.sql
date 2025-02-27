/*
  # Clean up authentication system
  
  1. Changes
    - Remove all custom role types and functions
    - Clean up any remaining admin role references
    - Set up simple authentication policies
    
  2. Security
    - Maintain RLS
    - Use built-in auth.uid() for authentication checks
*/

-- Drop all custom types and functions
DROP FUNCTION IF EXISTS auth.is_admin() CASCADE;
DROP FUNCTION IF EXISTS is_admin() CASCADE;
DROP FUNCTION IF EXISTS auth.is_authenticated() CASCADE;
DROP TYPE IF EXISTS auth.role CASCADE;
DROP TYPE IF EXISTS custom_types.user_role CASCADE;
DROP SCHEMA IF EXISTS custom_types CASCADE;

-- Remove role column from auth.users if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'role'
  ) THEN
    ALTER TABLE auth.users DROP COLUMN role;
  END IF;
END $$;

-- Drop all existing policies
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by authenticated users" ON events;
DROP POLICY IF EXISTS "Admin users have full access" ON events;
DROP POLICY IF EXISTS "Events are modifiable by admins" ON events;
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Authenticated users can modify events" ON events;

-- Create simple policies using only built-in auth
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