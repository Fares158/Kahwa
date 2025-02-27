import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { menuData } from '../../data/menuData';
import type { MenuItem } from '../../types/menu';
import Button from '../shared/Button';

const MenuEditor = () => {
  const { updateContent } = useAdmin();
  const [items, setItems] = useState(menuData);

  const handleItemUpdate = (category: string, itemId: string, changes: Partial<MenuItem>) => {
    const newItems = { ...items };
    const categoryItems = newItems[category];
    const itemIndex = categoryItems.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
      categoryItems[itemIndex] = { ...categoryItems[itemIndex], ...changes };
      setItems(newItems);
      updateContent('menu', { category, itemId, changes });
    }
  };

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Menu Editor</h2>
      
      {Object.entries(items).map(([category, categoryItems]) => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-medium mb-4">{category}</h3>
          <div className="space-y-4">
            {categoryItems.map((item) => (
              <div key={item.id} className="border rounded p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemUpdate(category, item.id, { name: e.target.value })}
                      className="input mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => handleItemUpdate(category, item.id, { price: e.target.value })}
                      className="input mt-1"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleItemUpdate(category, item.id, { description: e.target.value })}
                    className="input mt-1"
                    rows={2}
                  />
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={(e) => handleItemUpdate(category, item.id, { available: e.target.checked })}
                    />
                    <span className="text-sm">Available</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.featured}
                      onChange={(e) => handleItemUpdate(category, item.id, { featured: e.target.checked })}
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-6">
        <Button onClick={() => updateContent('menu', items)}>
          Save Changes
        </Button>
      </div>
    </section>
  );
};