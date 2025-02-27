/*
  # Fix Authentication Setup
  
  1. Changes
    - Create auth schema if not exists
    - Set up auth.users table properly
    - Create necessary auth functions
    - Set up RLS policies
    
  2. Security
    - Enable email authentication
    - Set up basic user roles
*/

-- Create auth schema if not exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.users table if not exists
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  encrypted_password text,
  email_confirmed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  raw_app_meta_data jsonb DEFAULT '{"provider":"email","providers":["email"]}'::jsonb,
  raw_user_meta_data jsonb DEFAULT '{}'::jsonb,
  is_super_admin boolean DEFAULT false,
  aud varchar(255) DEFAULT 'authenticated'
);

-- Create auth helper functions
CREATE OR REPLACE FUNCTION auth.uid() 
RETURNS uuid 
LANGUAGE sql STABLE
AS $$
  SELECT 
    coalesce(
      current_setting('request.jwt.claim.sub', true),
      (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
    )::uuid
$$;

-- Drop all existing policies
DROP POLICY IF EXISTS "Public read access" ON events;
DROP POLICY IF EXISTS "Authenticated write access" ON events;
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Authenticated users can modify events" ON events;
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by authenticated users" ON events;

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