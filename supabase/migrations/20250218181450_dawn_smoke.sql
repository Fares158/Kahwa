/*
  # Add language-specific columns to menu items

  1. Changes
    - Add item_name_en and description_en columns
    - Add item_name_fr and description_fr columns
    - Remove old item_name and description columns
    - Add NOT NULL constraints to ensure translations are provided
*/

-- First add new columns
ALTER TABLE menu_items 
ADD COLUMN item_name_en text,
ADD COLUMN description_en text,
ADD COLUMN item_name_fr text,
ADD COLUMN description_fr text;

-- Copy existing data to English columns (assuming current data is in English)
UPDATE menu_items
SET 
  item_name_en = item_name,
  description_en = description;

-- Add NOT NULL constraints
ALTER TABLE menu_items
ALTER COLUMN item_name_en SET NOT NULL,
ALTER COLUMN item_name_fr SET NOT NULL;

-- Drop old columns
ALTER TABLE menu_items
DROP COLUMN item_name,
DROP COLUMN description;

-- Add comment explaining the columns
COMMENT ON COLUMN menu_items.item_name_en IS 'English name of the menu item';
COMMENT ON COLUMN menu_items.description_en IS 'English description of the menu item';
COMMENT ON COLUMN menu_items.item_name_fr IS 'French name of the menu item';
COMMENT ON COLUMN menu_items.description_fr IS 'French description of the menu item';