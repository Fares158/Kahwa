import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import MenuFilters from './MenuFilters';
import MenuSearch from './MenuSearch';
import MenuSection from './MenuSection';
import { menuData } from '../../data/menuData';
import { MenuCategory } from '../../types/menu';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const categories = Object.keys(menuData) as MenuCategory[];

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const items = Object.entries(menuData).flatMap(([category, items]) =>
      items.map(item => ({ ...item, category: category as MenuCategory }))
    );

    return items.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<MenuCategory, typeof filteredItems>);
  }, [filteredItems]);

  return (
    <section className="section-padding bg-[#F5F5DC]" id="menu">
      <div className="container-custom">
        <h1 className="heading-1 text-center mb-12">{t('menu.title')}</h1>
        
        <MenuSearch value={searchQuery} onChange={setSearchQuery} />
        
        <MenuFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {Object.entries(groupedItems).map(([category, items]) => (
          <MenuSection
            key={category}
            title={t(`menu.categories.${category.toLowerCase()}`)}
            items={items}
          />
        ))}

        {filteredItems.length === 0 && (
          <p className="text-center text-gray-500">
            No menu items found. Try adjusting your search or filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default Menu;