/*
  # Complete Website Schema

  1. Tables
    - menu_items: Store menu items with categories, prices, etc.
    - reviews: Customer reviews and ratings
    - gallery: Image gallery with categories
    - contact_messages: Store contact form submissions
    - newsletter_subscribers: Email newsletter subscriptions
    - business_hours: Store opening hours
    - settings: Global website settings and configurations

  2. Security
    - RLS policies for each table
    - Secure access patterns for admin and public data

  3. Functions
    - Utility functions for common operations
    - Automatic timestamp management
*/

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  available boolean DEFAULT true,
  featured boolean DEFAULT false,
  dietary jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  avatar text,
  status text DEFAULT 'pending',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt text NOT NULL,
  caption text,
  category text,
  created_at timestamptz DEFAULT now()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  priority text DEFAULT 'normal',
  created_at timestamptz DEFAULT now()
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Business Hours
CREATE TABLE IF NOT EXISTS business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL,
  open_time time NOT NULL,
  close_time time NOT NULL,
  is_closed boolean DEFAULT false
);

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Menu Items
CREATE POLICY "Menu items are viewable by everyone" ON menu_items
  FOR SELECT USING (true);

CREATE POLICY "Menu items are editable by authenticated users only" ON menu_items
  FOR ALL TO authenticated USING (true);

-- Reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Reviews are insertable by everyone" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Reviews are editable by authenticated users only" ON reviews
  FOR UPDATE TO authenticated USING (true);

-- Gallery
CREATE POLICY "Gallery items are viewable by everyone" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Gallery items are editable by authenticated users only" ON gallery
  FOR ALL TO authenticated USING (true);

-- Contact Messages
CREATE POLICY "Contact messages are insertable by everyone" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Contact messages are viewable by authenticated users only" ON contact_messages
  FOR SELECT TO authenticated USING (true);

-- Newsletter Subscribers
CREATE POLICY "Newsletter subscriptions are insertable by everyone" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Newsletter subscriptions are viewable by authenticated users only" ON newsletter_subscribers
  FOR SELECT TO authenticated USING (true);

-- Business Hours
CREATE POLICY "Business hours are viewable by everyone" ON business_hours
  FOR SELECT USING (true);

CREATE POLICY "Business hours are editable by authenticated users only" ON business_hours
  FOR ALL TO authenticated USING (true);

-- Settings
CREATE POLICY "Settings are viewable by everyone" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Settings are editable by authenticated users only" ON settings
  FOR ALL TO authenticated USING (true);

-- Utility Functions

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default business hours
INSERT INTO business_hours (day, open_time, close_time) VALUES
  ('Monday', '07:00', '20:00'),
  ('Tuesday', '07:00', '20:00'),
  ('Wednesday', '07:00', '20:00'),
  ('Thursday', '07:00', '20:00'),
  ('Friday', '07:00', '20:00'),
  ('Saturday', '08:00', '21:00'),
  ('Sunday', '08:00', '21:00');

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('site_info', '{"name": "The Cast", "description": "Where Coffee Meets Cinema", "contact": {"email": "info@thecast.com", "phone": "+216 71 234 567"}}'),
  ('theme', '{"primary": "#8B4513", "secondary": "#1A1A1A", "accent": "#E5B94C"}'),
  ('social_links', '{"facebook": "https://facebook.com/thecast", "instagram": "https://instagram.com/thecast", "twitter": "https://twitter.com/thecast"}');