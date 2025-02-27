-- Create enum for media types
CREATE TYPE media_type AS ENUM ('image', 'video');

-- Create folders table
CREATE TABLE folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('interior', 'drinks', 'food', 'events')),
  description text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media table
CREATE TABLE media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type media_type NOT NULL,
  url text NOT NULL,
  thumbnail_url text, -- For video thumbnails
  category text NOT NULL CHECK (category IN ('interior', 'drinks', 'food', 'events')),
  folder_id uuid REFERENCES folders(id) ON DELETE SET NULL,
  metadata jsonb DEFAULT '{}'::jsonb, -- Store additional metadata (dimensions, duration, etc.)
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Create policies for folders
CREATE POLICY "Folders are viewable by everyone"
  ON folders FOR SELECT
  USING (true);

CREATE POLICY "Folders are modifiable by authenticated users only"
  ON folders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for media
CREATE POLICY "Media is viewable by everyone"
  ON media FOR SELECT
  USING (true);

CREATE POLICY "Media is modifiable by authenticated users only"
  ON media FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at triggers
CREATE TRIGGER update_folders_updated_at
  BEFORE UPDATE ON folders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_updated_at
  BEFORE UPDATE ON media
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX media_category_idx ON media(category);
CREATE INDEX media_folder_id_idx ON media(folder_id);
CREATE INDEX folders_category_idx ON folders(category);

-- Create helper functions
CREATE OR REPLACE FUNCTION get_folder_category(folder_id uuid)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (SELECT category FROM folders WHERE id = folder_id);
END;
$$;

-- Create trigger to sync folder and media categories
CREATE OR REPLACE FUNCTION sync_media_category()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.folder_id IS NOT NULL THEN
    NEW.category := get_folder_category(NEW.folder_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_media_category_trigger
  BEFORE INSERT OR UPDATE ON media
  FOR EACH ROW
  EXECUTE FUNCTION sync_media_category();

-- Insert sample data
INSERT INTO folders (name, category, description) VALUES
  ('Cafe Interior', 'interior', 'Photos of our cafe interior'),
  ('Signature Drinks', 'drinks', 'Our signature coffee and tea creations'),
  ('Special Events', 'events', 'Movie nights and special screenings');

INSERT INTO media (title, type, url, category, description) VALUES
  ('Cafe Entrance', 'image', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', 'interior', 'Main entrance of our cafe'),
  ('Coffee Bar', 'image', 'https://images.unsplash.com/photo-1445116572660-236099ec97a0', 'interior', 'Our professional coffee bar'),
  ('Signature Latte', 'image', 'https://images.unsplash.com/photo-1541167760496-1628856ab772', 'drinks', 'Our famous signature latte'),
  ('Pastry Selection', 'image', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', 'food', 'Daily fresh pastries');