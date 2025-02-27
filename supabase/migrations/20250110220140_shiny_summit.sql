/*
  # Fix Authentication Schema
  
  1. Changes
    - Create proper Supabase auth schema
    - Add required auth tables and columns
    - Set up authentication functions
*/

-- Create auth schema if not exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.users table with all required columns
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instance_id uuid,
  email text,
  encrypted_password text,
  email_confirmed_at timestamptz,
  invited_at timestamptz,
  confirmation_token text,
  confirmation_sent_at timestamptz,
  recovery_token text,
  recovery_sent_at timestamptz,
  email_change_token_new text,
  email_change text,
  email_change_sent_at timestamptz,
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb DEFAULT '{}'::jsonb,
  raw_user_meta_data jsonb DEFAULT '{}'::jsonb,
  is_super_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  phone text DEFAULT NULL::text,
  phone_confirmed_at timestamptz,
  phone_change text DEFAULT ''::text,
  phone_change_token text DEFAULT ''::text,
  phone_change_sent_at timestamptz,
  confirmed_at timestamptz,
  email_change_token_current text DEFAULT ''::text,
  email_change_confirm_status smallint DEFAULT 0,
  banned_until timestamptz,
  reauthentication_token text DEFAULT ''::text,
  reauthentication_sent_at timestamptz,
  is_sso_user boolean DEFAULT false,
  deleted_at timestamptz,
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_phone_key UNIQUE (phone)
);

-- Create identities table
CREATE TABLE IF NOT EXISTS auth.identities (
  id text NOT NULL,
  user_id uuid NOT NULL,
  identity_data jsonb NOT NULL,
  provider text NOT NULL,
  last_sign_in_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  email text GENERATED ALWAYS AS (lower(identity_data->>'email')) STORED,
  CONSTRAINT identities_pkey PRIMARY KEY (provider, id),
  CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create admin user
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@thecast.com') THEN
    INSERT INTO auth.users (
      email,
      encrypted_password,
      email_confirmed_at,
      confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data
    ) VALUES (
      'admin@thecast.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"role":"admin"}'::jsonb
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