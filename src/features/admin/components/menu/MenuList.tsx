import React from 'react';
import { Edit2, Trash2, Star } from 'lucide-react';
import { MenuItem } from '../../types';
import { menuData } from '../../../../data/menuData';

interface MenuListProps {
  onEditItem: (item: MenuItem) => void;
}

const MenuList = ({ onEditItem }: MenuListProps) => {
  const categories = Object.keys(menuData);

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category} className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{category}</h3>
          </div>
          <div className="divide-y">
            {menuData[category].map((item) => (
              <div 
                key={item.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.featured && (
                    <Star className="w-4 h-4 text-yellow-400" />
                  )}
                  <button
                    onClick={() => onEditItem(item)}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:text-red-900 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;