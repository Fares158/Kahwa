import React from 'react';
import { useMenu } from '../hooks/useMenu';
import MenuSection from '../components/Menu/MenuSection';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const Menu = () => {
  const { t, language } = useLanguage();
  const { categories, items, loading, error } = useMenu();

  if (loading) {
    return (
      <main className="pt-16 bg-black">
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-[#E5B94C] mb-12 font-mono">
              {t('menu.title')}
            </h1>
            <LoadingSpinner />
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-16 bg-black">
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-[#E5B94C] mb-12 font-mono">
              {t('menu.title')}
            </h1>
            <div className="text-center text-red-400 p-4 rounded-lg bg-red-900/20">
              {error.message}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Transform items to use the correct language
  const localizedItems = items.map(item => ({
    ...item,
    item_name: language === 'fr' ? item.item_name_fr : item.item_name_en,
    description: language === 'fr' ? item.description_fr : item.description_en
  }));

  // Group items by category
  const menuByCategory = categories.reduce((acc, category) => {
    acc[category.category_name] = localizedItems.filter(
      item => item.category_id === category.id
    );
    return acc;
  }, {} as Record<string, typeof localizedItems>);

  return (
    <main className="pt-16 bg-black">
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-[#E5B94C] mb-12 font-mono">
            {t('menu.title')}
          </h1>
          <div className="space-y-6">
            {categories.map((category) => (
              <MenuSection
                key={category.id}
                category={category.category_name}
                items={menuByCategory[category.category_name] || []}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Menu;