-- Add display_order column to menu_categories
ALTER TABLE menu_categories ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- Update existing categories with sequential order
WITH ordered_categories AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY category_name) - 1 as row_num
  FROM menu_categories
)
UPDATE menu_categories
SET display_order = ordered_categories.row_num
FROM ordered_categories
WHERE menu_categories.id = ordered_categories.id;

-- Add comment to explain column usage
COMMENT ON COLUMN menu_categories.display_order IS 'Controls the display order of categories in the menu';