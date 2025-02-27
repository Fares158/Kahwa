import React from 'react';
import { GripVertical, Edit2, Trash2 } from 'lucide-react';
import type { MenuCategory } from '../../../../types/menu';

interface CategoryListProps {
  categories: MenuCategory[];
  onEditCategory: (category: MenuCategory) => void;
  onDeleteCategory: (id: string) => void;
  onReorderCategories: (newOrder: MenuCategory[]) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEditCategory,
  onDeleteCategory,
  onReorderCategories
}) => {
  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];
    
    // Update display order
    newCategories.forEach((cat, i) => {
      cat.display_order = i;
    });

    onReorderCategories(newCategories);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Categories</h3>
      </div>
      <div className="divide-y">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveCategory(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMoveCategory(index, 'down')}
                  disabled={index === categories.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  title="Move down"
                >
                  ↓
                </button>
              </div>
              <span className="font-medium">{category.category_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEditCategory(category)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                title="Edit category"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteCategory(category.id)}
                className="p-2 text-red-600 hover:text-red-900 rounded-lg hover:bg-red-50"
                title="Delete category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;