import { useState, useEffect } from 'react';
import * as menuApi from '../lib/supabase/menu';
import type { MenuCategory, MenuItem, MenuItemTag } from '../types/menu';

export function useMenu() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [tags, setTags] = useState<MenuItemTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [categoriesData, itemsData, tagsData] = await Promise.all([
          menuApi.fetchMenuCategories(),
          menuApi.fetchMenuItems(),
          menuApi.fetchMenuTags()
        ]);
        
        setCategories(categoriesData);
        setItems(itemsData);
        setTags(tagsData);
      } catch (err) {
        console.error('Error fetching menu data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch menu data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const addCategory = async (categoryName: string) => {
    if (!categoryName?.trim()) {
      throw new Error('Category name is required');
    }

    try {
      const newCategory = await menuApi.createMenuCategory(categoryName);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add category');
    }
  };

  const updateCategory = async (id: string, updates: Partial<MenuCategory>) => {
    if (updates.category_name && !updates.category_name.trim()) {
      throw new Error('Category name cannot be empty');
    }

    try {
      const updatedCategory = await menuApi.updateMenuCategory(id, updates);
      setCategories(prev => prev.map(cat => cat.id === id ? updatedCategory : cat));
      return updatedCategory;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update category');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await menuApi.deleteMenuCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete category');
    }
  };

  const reorderCategories = async (newOrder: MenuCategory[]) => {
    try {
      await menuApi.updateCategoryOrder(newOrder);
      setCategories(newOrder);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to reorder categories');
    }
  };

  const addItem = async (item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newItem = await menuApi.createMenuItem(item);
      setItems(prev => [...prev, newItem]);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add menu item');
    }
  };

  const updateItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const updatedItem = await menuApi.updateMenuItem(id, updates);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update menu item');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await menuApi.deleteMenuItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete menu item');
    }
  };

  return {
    categories,
    items,
    tags,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    addItem,
    updateItem,
    deleteItem
  };
}