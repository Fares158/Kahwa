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
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
    AND role = 'admin'::custom_types.user_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies
DROP POLICY IF EXISTS "Allow full access to admins" ON events;
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Events are modifiable by admins" ON events;

-- Create new policies
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Events are modifiable by admins"
  ON events FOR ALL
  TO authenticated
  USING (auth.is_admin())
  WITH CHECK (auth.is_admin());

-- Create admin user if not exists
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
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      role,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      aud,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'admin@thecast.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      'admin'::custom_types.user_role,
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"role":"admin"}'::jsonb,
      now(),
      now(),
      'authenticated',
      '',
      '',
      '',
      ''
    );
  ELSE
    -- Update existing admin user's role
    UPDATE auth.users
    SET role = 'admin'::custom_types.user_role
    WHERE id = admin_user_id;
  END IF;
END $$;