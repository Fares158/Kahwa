import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MenuList from './MenuList';
import MenuItemForm from './MenuItemForm';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import PageHeader from '../../../../components/shared/PageHeader';
import { useMenu } from '../../../../hooks/useMenu';
import { toast } from 'react-hot-toast';
import type { MenuItem, MenuCategory } from '../../../../types/menu';

const MenuEditor = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  
  const { 
    categories, 
    items, 
    loading, 
    error, 
    addItem, 
    updateItem, 
    deleteItem,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories
  } = useMenu();

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsItemFormOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsItemFormOpen(true);
  };

  const handleCloseItemForm = () => {
    setIsItemFormOpen(false);
    setSelectedItem(null);
  };

  const handleSaveItem = async (data: Partial<MenuItem>) => {
    try {
      if (selectedItem) {
        await updateItem(selectedItem.id, data);
        toast.success('Item updated successfully');
      } else {
        await addItem(data as Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>);
        toast.success('Item added successfully');
      }
      handleCloseItemForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save item';
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleEditCategory = (category: MenuCategory) => {
    setSelectedCategory(category);
    setIsCategoryFormOpen(true);
  };

  const handleSaveCategory = async (categoryName: string) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, { category_name: categoryName });
        toast.success('Category updated successfully');
      } else {
        await addCategory(categoryName);
        toast.success('Category added successfully');
      }
      setIsCategoryFormOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save category';
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category? All items in this category will also be deleted.')) {
      return;
    }

    try {
      await deleteCategory(id);
      toast.success('Category deleted successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete category';
      toast.error(errorMessage);
    }
  };

  const handleReorderCategories = async (newOrder: MenuCategory[]) => {
    try {
      await reorderCategories(newOrder);
      toast.success('Categories reordered successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reorder categories';
      toast.error(errorMessage);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading menu data: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Menu Management">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCategoryFormOpen(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={handleAddItem}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </PageHeader>

      <CategoryList
        categories={categories}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        onReorderCategories={handleReorderCategories}
      />

      <MenuList
        categories={categories}
        items={items}
        loading={loading}
        onEditItem={handleEditItem}
        onDeleteItem={deleteItem}
      />
      
      {isItemFormOpen && (
        <MenuItemForm
          item={selectedItem}
          categories={categories}
          onClose={handleCloseItemForm}
          onSubmit={handleSaveItem}
        />
      )}

      {isCategoryFormOpen && (
        <CategoryForm
          category={selectedCategory}
          onClose={() => {
            setIsCategoryFormOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleSaveCategory}
        />
      )}
    </div>
  );
};

export default MenuEditor;