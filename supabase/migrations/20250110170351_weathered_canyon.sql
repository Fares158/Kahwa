-- Drop any existing policies
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by admins" ON events;
DROP POLICY IF EXISTS "Allow full access to admins" ON events;

-- Create basic policies that don't rely on custom roles
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Events are modifiable by authenticated users"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to check authenticated status
CREATE OR REPLACE FUNCTION auth.is_authenticated()
RETURNS boolean AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure RLS is enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;