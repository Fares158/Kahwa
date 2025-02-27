import React from 'react';
import { cn } from '../../utils/cn';
import { MenuItem as MenuItemType } from '../../types/menu';
import { Leaf, Wheat, VeganIcon } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const {
    name,
    description,
    price,
    image,
    available = true,
    dietary,
    featured,
  } = item;

  return (
    <div
      className={cn(
        'card',
        !available && 'opacity-50',
        featured && 'border-2 border-primary'
      )}
    >
      <div className="relative aspect-video mb-4 overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm">
            Featured
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{name}</h3>
          <span className="font-mono text-primary">{price}</span>
        </div>

        <p className="text-sm text-gray-600">{description}</p>

        {dietary && (
          <div className="flex gap-2">
            {dietary.vegetarian && (
              <Leaf className="h-4 w-4 text-green-600" title="Vegetarian" />
            )}
            {dietary.vegan && (
              <VeganIcon className="h-4 w-4 text-green-600" title="Vegan" />
            )}
            {dietary.glutenFree && (
              <Wheat className="h-4 w-4 text-amber-600" title="Gluten Free" />
            )}
          </div>
        )}

        {!available && (
          <p className="text-sm text-red-500">Currently unavailable</p>
        )}
      </div>
    </div>
  );
};

export default MenuItem;