import React from 'react';
import { cn } from '../../utils/cn';
import Button from '../shared/Button';
import { MenuCategory } from '../../types/menu';

interface MenuFiltersProps {
  categories: MenuCategory[];
  activeCategory: MenuCategory | 'all';
  onCategoryChange: (category: MenuCategory | 'all') => void;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant="secondary"
        onClick={() => onCategoryChange('all')}
        className={cn(
          'text-sm',
          activeCategory === 'all' && 'bg-[#8B4513] text-white'
        )}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="secondary"
          onClick={() => onCategoryChange(category)}
          className={cn(
            'text-sm',
            activeCategory === category && 'bg-[#8B4513] text-white'
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default MenuFilters;