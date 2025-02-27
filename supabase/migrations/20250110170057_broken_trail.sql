-- Create custom types schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS custom_types;

-- Create role type in custom_types schema
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role' AND typnamespace = 'custom_types'::regnamespace) THEN
    CREATE TYPE custom_types.user_role AS ENUM ('admin', 'user');
  END IF;
END $$;

-- Add role column to auth.users if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'role'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN role custom_types.user_role DEFAULT 'user';
  END IF;
END $$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION auth.is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = user_id
    AND role = 'admin'::custom_types.user_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for admin access
CREATE POLICY "Allow full access to admins"
  ON events
  FOR ALL
  TO authenticated
  USING (auth.is_admin(auth.uid()))
  WITH CHECK (auth.is_admin(auth.uid()));

-- Update existing policies to include admin access
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are insertable by authenticated users" ON events;
DROP POLICY IF EXISTS "Events are updatable by authenticated users" ON events;
DROP POLICY IF EXISTS "Events are deletable by authenticated users" ON events;

CREATE POLICY "Events are viewable by everyone"
  ON events
  FOR SELECT
  USING (true);

CREATE POLICY "Events are modifiable by admins"
  ON events
  USING (auth.is_admin(auth.uid()))
  WITH CHECK (auth.is_admin(auth.uid()));

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create or update admin user
DO $$ 
DECLARE
  admin_user_id uuid;
BEGIN
  -- Check if admin user exists
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'admin@thecast.com';

  -- If admin doesn't exist, create them
  IF admin_user_id IS NULL THEN
    INSERT INTO auth.users (
      email,
      encrypted_password,
      role,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      aud,
      confirmed_at
    ) VALUES (
      'admin@thecast.com',
      crypt('admin123', gen_salt('bf')),
      'admin'::custom_types.user_role,
      now(),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object('role', 'admin'),
      now(),
      now(),
      'authenticated',
      now()
    );
  ELSE
    -- Update existing admin user's role
    UPDATE auth.users
    SET role = 'admin'::custom_types.user_role
    WHERE id = admin_user_id;
  END IF;
END $$;