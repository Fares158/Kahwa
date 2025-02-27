-- Drop existing tables if they exist
DROP TABLE IF EXISTS menu_item_tag_relations CASCADE;
DROP TABLE IF EXISTS menu_item_tags CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menu_categories CASCADE;

-- Create menu categories table
CREATE TABLE menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name text NOT NULL UNIQUE,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menu items table with proper foreign key
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES menu_categories(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  image_url text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE menu_item_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_name text NOT NULL UNIQUE,
  icon_url text,
  created_at timestamptz DEFAULT now()
);

-- Create tag relations table
CREATE TABLE menu_item_tag_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES menu_item_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(menu_item_id, tag_id)
);

-- Enable RLS
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_tag_relations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Menu categories are viewable by everyone" 
  ON menu_categories FOR SELECT USING (true);

CREATE POLICY "Menu categories are modifiable by authenticated users" 
  ON menu_categories FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Menu items are viewable by everyone" 
  ON menu_items FOR SELECT USING (true);

CREATE POLICY "Menu items are modifiable by authenticated users" 
  ON menu_items FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Menu tags are viewable by everyone" 
  ON menu_item_tags FOR SELECT USING (true);

CREATE POLICY "Menu tags are modifiable by authenticated users" 
  ON menu_item_tags FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Menu tag relations are viewable by everyone" 
  ON menu_item_tag_relations FOR SELECT USING (true);

CREATE POLICY "Menu tag relations are modifiable by authenticated users" 
  ON menu_item_tag_relations FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_menu_categories_updated_at
  BEFORE UPDATE ON menu_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO menu_categories (category_name) VALUES
  ('Coffee'),
  ('Tea'),
  ('Pastries');

-- Insert menu items
WITH categories AS (
  SELECT * FROM menu_categories
)
INSERT INTO menu_items (
  category_id,
  item_name,
  description,
  price,
  image_url
) VALUES
  (
    (SELECT id FROM categories WHERE category_name = 'Coffee'),
    'The Godfather Espresso',
    'An offer you can''t refuse - rich and bold single shot of pure coffee essence',
    3.50,
    'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80'
  ),
  (
    (SELECT id FROM categories WHERE category_name = 'Coffee'),
    'Casablanca Cappuccino',
    'Here''s looking at you, kid - perfect balance of espresso, steamed milk, and foam',
    4.50,
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80'
  ),
  (
    (SELECT id FROM categories WHERE category_name = 'Tea'),
    'Breakfast at Tiffany''s',
    'Classic English breakfast tea served with elegance',
    3.00,
    'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80'
  ),
  (
    (SELECT id FROM categories WHERE category_name = 'Pastries'),
    'Cinema Paradiso Croissant',
    'Flaky, buttery layers of freshly baked perfection',
    3.50,
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80'
  );

-- Insert tags
INSERT INTO menu_item_tags (tag_name) VALUES
  ('Vegetarian'),
  ('Vegan'),
  ('Gluten Free');

-- Add some tag relations
WITH items AS (
  SELECT id FROM menu_items WHERE item_name = 'Casablanca Cappuccino'
),
tags AS (
  SELECT id FROM menu_item_tags WHERE tag_name IN ('Vegetarian', 'Vegan')
)
INSERT INTO menu_item_tag_relations (menu_item_id, tag_id)
SELECT items.id, tags.id
FROM items CROSS JOIN tags;