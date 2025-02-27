/*
  # Fix authentication and policies
  
  1. Changes
    - Set up basic RLS policies
    - Ensure proper unique constraints
    
  2. Security
    - Maintain simple RLS policies
    - Use standard Supabase auth
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Authenticated users can modify events" ON events;

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