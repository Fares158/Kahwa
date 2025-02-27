import { supabase } from './client';
import type { MenuCategory, MenuItem, MenuItemTag } from '../../types/menu';

export async function fetchMenuCategories() {
  const { data, error } = await supabase
    .from('menu_categories')
    .select('*')
    .order('display_order');

  if (error) throw error;
  return data as MenuCategory[];
}

export async function createMenuCategory(categoryName: string) {
  if (!categoryName?.trim()) {
    throw new Error('Category name is required');
  }

  // Get the highest display order
  const { data: lastCategory } = await supabase
    .from('menu_categories')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (lastCategory?.display_order ?? -1) + 1;

  const { data, error } = await supabase
    .from('menu_categories')
    .insert([{
      category_name: categoryName.trim(),
      display_order: nextOrder
    }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('A category with this name already exists');
    }
    throw error;
  }

  return data as MenuCategory;
}

export async function updateMenuCategory(id: string, updates: Partial<MenuCategory>) {
  if (updates.category_name && !updates.category_name.trim()) {
    throw new Error('Category name cannot be empty');
  }

  const { data, error } = await supabase
    .from('menu_categories')
    .update({
      ...updates,
      category_name: updates.category_name?.trim()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('A category with this name already exists');
    }
    throw error;
  }

  return data as MenuCategory;
}

export async function deleteMenuCategory(id: string) {
  const { error } = await supabase
    .from('menu_categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function updateCategoryOrder(categories: MenuCategory[]) {
  const updates = categories.map((category, index) => ({
    id: category.id,
    category_name: category.category_name,
    display_order: index
  }));

  const { error } = await supabase
    .from('menu_categories')
    .upsert(updates, {
      onConflict: 'id',
      ignoreDuplicates: false
    });

  if (error) throw error;
}

export async function fetchMenuItems() {
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      menu_categories (
        id,
        category_name
      ),
      menu_item_tag_relations (
        menu_item_tags (
          id,
          tag_name,
          icon_url
        )
      )
    `)
    .order('item_name_en');

  if (error) throw error;

  // Transform the data to match our types
  return data.map(item => ({
    ...item,
    item_name: item.item_name_en, // Use English name as default
    description: item.description_en, // Use English description as default
    tags: item.menu_item_tag_relations?.map(relation => relation.menu_item_tags)
  }));
}

export async function createMenuItem(item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('menu_items')
    .insert([{
      category_id: item.category_id,
      item_name_en: item.item_name,
      item_name_fr: item.item_name, // Add French translation later
      description_en: item.description,
      description_fr: item.description, // Add French translation later
      price: item.price,
      image_url: item.image_url,
      unavailable: item.unavailable
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMenuItem(id: string, updates: Partial<MenuItem>) {
  const { data, error } = await supabase
    .from('menu_items')
    .update({
      ...updates,
      item_name_en: updates.item_name,
      item_name_fr: updates.item_name, // Update French translation if available
      description_en: updates.description,
      description_fr: updates.description // Update French translation if available
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMenuItem(id: string) {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function fetchMenuTags() {
  const { data, error } = await supabase
    .from('menu_item_tags')
    .select('*')
    .order('tag_name');

  if (error) throw error;
  return data as MenuItemTag[];
}

export async function addTagToMenuItem(menuItemId: string, tagId: string) {
  const { error } = await supabase
    .from('menu_item_tag_relations')
    .insert([{ menu_item_id: menuItemId, tag_id: tagId }]);

  if (error) throw error;
}

export async function removeTagFromMenuItem(menuItemId: string, tagId: string) {
  const { error } = await supabase
    .from('menu_item_tag_relations')
    .delete()
    .eq('menu_item_id', menuItemId)
    .eq('tag_id', tagId);

  if (error) throw error;
}