-- Create events table if it doesn't exist
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  image text NOT NULL,
  views integer DEFAULT 0,
  status text NOT NULL CHECK (status IN ('upcoming', 'past')) DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'events' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE events ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
  DROP POLICY IF EXISTS "Events are insertable by authenticated users" ON events;
  DROP POLICY IF EXISTS "Events are updatable by authenticated users" ON events;
  DROP POLICY IF EXISTS "Events are deletable by authenticated users" ON events;
  
  -- Create new policies
  CREATE POLICY "Events are viewable by everyone"
    ON events
    FOR SELECT
    USING (true);

  CREATE POLICY "Events are insertable by authenticated users"
    ON events
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  CREATE POLICY "Events are updatable by authenticated users"
    ON events
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  CREATE POLICY "Events are deletable by authenticated users"
    ON events
    FOR DELETE
    USING (auth.role() = 'authenticated');
END $$;

-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();