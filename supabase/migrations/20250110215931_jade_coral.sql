/*
  # Simple Authentication Setup
  
  1. Changes
    - Clean auth configuration
    - Basic table structure
    - Simple policies
*/

-- Create auth schema if not exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create basic auth users table
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  encrypted_password text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON auth.users (email);

-- Create admin user if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@thecast.com') THEN
    INSERT INTO auth.users (email, encrypted_password)
    VALUES (
      'admin@thecast.com',
      crypt('admin123', gen_salt('bf'))
    );
  END IF;
END $$;

-- Simple events policies
DROP POLICY IF EXISTS "Events read access" ON events;
DROP POLICY IF EXISTS "Events write access" ON events;

CREATE POLICY "Events read access"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Events write access"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;