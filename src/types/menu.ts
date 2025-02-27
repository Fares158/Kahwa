export interface MenuCategory {
  id: string;
  category_name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  item_name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  unavailable: boolean;
  created_at: string;
  updated_at: string;
  // Multilingual fields
  item_name_en: string;
  item_name_fr: string;
  description_en: string | null;
  description_fr: string | null;
  tags?: MenuItemTag[];
}

export interface MenuItemTag {
  id: string;
  tag_name: string;
  icon_url: string | null;
}

export interface MenuItemWithCategory extends MenuItem {
  category: MenuCategory;
}