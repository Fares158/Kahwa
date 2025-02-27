import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import MenuItemCard from './MenuItemCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { MenuItem } from '../../types/menu';

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ category, items }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="mb-4 last:mb-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-[#1A1A1A]/80 rounded-lg text-[#E5B94C] hover:bg-[#1A1A1A] transition-colors"
      >
        <h2 className="text-lg sm:text-xl font-bold font-mono truncate pr-2">
          {category}
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mt-2 sm:mt-4">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSection;
