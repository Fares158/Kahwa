-- Remove featured column and add unavailable column
ALTER TABLE menu_items DROP COLUMN IF EXISTS featured;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS unavailable boolean DEFAULT false;

-- Update existing data
UPDATE menu_items SET unavailable = false WHERE unavailable IS NULL;

-- Add comment to explain column usage
COMMENT ON COLUMN menu_items.unavailable IS 'Indicates if an item is temporarily out of stock';