import React from 'react';
import { X } from 'lucide-react';
import { MenuItem, MenuCategory } from '../../../../types/menu';
import { useLanguage } from '../../../../contexts/LanguageContext';

interface MenuItemFormProps {
  item?: MenuItem | null;
  categories: MenuCategory[];
  onClose: () => void;
  onSubmit: (data: Partial<MenuItem>) => Promise<void>;
}

const MenuItemForm = ({ item, categories, onClose, onSubmit }: MenuItemFormProps) => {
  const { language } = useLanguage();
  const isEdit = Boolean(item);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      category_id: formData.get('category_id') as string,
      item_name: formData.get('item_name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      image_url: formData.get('image_url') as string,
      unavailable: formData.get('unavailable') === 'on'
    };
    await onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {isEdit ? 'Edit Menu Item' : 'Add Menu Item'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="item_name"
                className="input mt-1"
                defaultValue={item?.item_name || ''}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                className="input mt-1"
                defaultValue={item?.price || ''}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                className="input mt-1"
                rows={3}
                defaultValue={item?.description || ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select 
                name="category_id"
                className="input mt-1" 
                defaultValue={item?.category_id || ''}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                className="input mt-1"
                defaultValue={item?.image_url || ''}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="unavailable"
                defaultChecked={item?.unavailable}
              />
              <span className="text-sm">Out of Stock</span>
            </label>
          </div>

          <div className="border-t pt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEdit ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemForm;