/*
  # Events System Schema

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `short_description` (text, required)
      - `description` (text, required)
      - `date` (date, required)
      - `time` (time, required)
      - `image` (text, required)
      - `views` (integer, default 0)
      - `status` (enum: upcoming, past)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on `events` table
    - Add policies for:
      - Public read access
      - Authenticated admin write access
*/

-- Create events status enum
CREATE TYPE event_status AS ENUM ('upcoming', 'past');

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  image text NOT NULL,
  views integer DEFAULT 0,
  status event_status NOT NULL DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Events are viewable by everyone"
  ON events
  FOR SELECT
  USING (true);

CREATE POLICY "Events are insertable by authenticated users only"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Events are updatable by authenticated users only"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Events are deletable by authenticated users only"
  ON events
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();