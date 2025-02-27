/*
  # Add Supabase Authentication Functions
  
  1. Changes
    - Add required Supabase auth functions
    - Enable required extensions
    - Add auth helper functions
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Auth functions
CREATE OR REPLACE FUNCTION auth.uid() 
RETURNS uuid 
LANGUAGE sql STABLE
AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.sub', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
  )::uuid
$$;

CREATE OR REPLACE FUNCTION auth.role() 
RETURNS text 
LANGUAGE sql STABLE
AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.role', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'role')
  )::text
$$;

CREATE OR REPLACE FUNCTION auth.email() 
RETURNS text 
LANGUAGE sql STABLE
AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.email', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'email')
  )::text
$$;

-- Update admin user metadata if exists
DO $$ 
BEGIN
  UPDATE auth.users 
  SET 
    raw_app_meta_data = COALESCE(raw_app_meta_data, '{}') || '{"provider":"email","providers":["email"]}'::jsonb,
    raw_user_meta_data = COALESCE(raw_user_meta_data, '{}') || '{"role":"admin"}'::jsonb
  WHERE 
    email = 'admin@thecast.com';
END $$;