/*
  # Set up authentication and admin user
  
  1. Enable email authentication
  2. Create admin role type
  3. Add role column to users table
  4. Create initial admin user
  5. Create admin check function
*/

-- Enable email auth provider
CREATE OR REPLACE FUNCTION auth.email_auth_enabled() RETURNS boolean AS $$
BEGIN
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Create admin role if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role' AND typnamespace = 'auth'::regnamespace) THEN
    CREATE TYPE auth.role AS ENUM ('admin', 'user');
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
    ALTER TABLE auth.users ADD COLUMN role auth.role DEFAULT 'user';
  END IF;
END $$;

-- Create admin user if it doesn't exist
DO $$ 
DECLARE
  admin_id uuid := gen_random_uuid();
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@thecast.com'
  ) THEN
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      role,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token,
      aud,
      instance_id
    ) VALUES (
      admin_id,
      'admin@thecast.com',
      crypt('admin123', gen_salt('bf')),
      'admin',
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"role":"admin"}',
      now(),
      now(),
      '',
      '',
      '',
      '',
      'authenticated',
      '00000000-0000-0000-0000-000000000000'
    );
  END IF;
END $$;

-- Create policy to check admin role
CREATE OR REPLACE FUNCTION auth.is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = user_id
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;