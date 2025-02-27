import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MenuItem } from '../../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
      {/* Image container with padding and fixed square aspect ratio */}
      <div className="p-2">
        <div className="relative w-full pt-[100%] rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={
                item.image_url ||
                'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80'
              }
              alt={item.item_name}
              className={`w-[90%] h-[90%] object-cover rounded-lg ${
                item.unavailable ? 'opacity-50' : ''
              }`}
            />
          </div>
          {item.unavailable && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content container */}
      <div className="p-2 pt-0 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight break-words">
            {item.item_name}
          </h3>
          <span className="text-primary font-mono text-sm whitespace-nowrap shrink-0">
            {item.price.toFixed(2)}DT
          </span>
        </div>

        {item.description && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          {item.tags && item.tags.length > 0 && (
            <div className="flex gap-1">
              {item.tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.icon_url || ''}
                  alt={tag.tag_name}
                  className="w-4 h-4"
                  title={tag.tag_name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
