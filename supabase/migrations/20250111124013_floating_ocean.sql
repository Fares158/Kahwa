-- Drop and recreate auth functions to ensure clean state
CREATE OR REPLACE FUNCTION auth.uid() 
RETURNS uuid 
LANGUAGE sql STABLE
AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.sub', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
  )::uuid
$$;

-- Ensure admin user has correct metadata
UPDATE auth.users 
SET 
  raw_app_meta_data = jsonb_build_object(
    'provider', 'email',
    'providers', ARRAY['email']
  ),
  raw_user_meta_data = jsonb_build_object(
    'role', 'admin'
  ),
  email_confirmed_at = COALESCE(email_confirmed_at, now()),
  created_at = COALESCE(created_at, now()),
  updated_at = now(),
  aud = 'authenticated'
WHERE email = 'admin@thecast.com';

-- Insert admin user if not exists
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  created_at,
  updated_at
)
SELECT 
  'admin@thecast.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"role":"admin"}'::jsonb,
  'authenticated',
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@thecast.com'
);

-- Ensure proper RLS policies
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own data" ON auth.users;
CREATE POLICY "Users can view own data" ON auth.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON auth.users;
CREATE POLICY "Users can update own data" ON auth.users
  FOR UPDATE USING (auth.uid() = id);