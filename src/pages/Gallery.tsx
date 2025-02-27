import React, { useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ImagePreview from '../components/shared/ImagePreview';
import type { MediaItem, GalleryFilter } from '../types/gallery';
import { ZoomIn, ZoomOut } from 'lucide-react';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<GalleryFilter>({});
  const [zoomLevel, setZoomLevel] = useState<0 | 1 | 2>(0); // 0: most zoomed out, 2: most zoomed in

  const { media, loading, error } = useGallery(filter);

  const categories = ['all', 'interior', 'drinks', 'food', 'events'];

  const handleCategoryChange = (category: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFilter(prev => ({
      ...prev,
      category: category === 'all' ? undefined : category
    }));
  };

  const handleZoom = () => {
    setZoomLevel((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
  };

  const getGridCols = () => {
    switch (zoomLevel) {
      case 0: // Most zoomed out
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6';
      case 1: // Medium zoom
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 2: // Most zoomed in
        return 'grid-cols-1 md:grid-cols-2';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  if (loading) {
    return (
      <main className="pt-16 bg-[#F5F5DC]">
        <section className="py-16">
          <div className="container-custom">
            <h1 className="heading-1 text-center mb-12">{t('gallery.title')}</h1>
            <LoadingSpinner />
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-16 bg-[#F5F5DC]">
        <section className="py-16">
          <div className="container-custom">
            <h1 className="heading-1 text-center mb-12">{t('gallery.title')}</h1>
            <div className="text-center text-red-600 p-4 rounded-lg bg-red-50">
              {error.message}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-16 bg-[#F5F5DC]">
      <section className="py-16">
        <div className="container-custom">
          <h1 className="heading-1 text-center mb-12">{t('gallery.title')}</h1>

          {/* Category Filters and Zoom Toggle */}
          <div className="flex justify-between items-center gap-4 mb-8">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${
                    (category === 'all' && !filter.category) || category === filter.category
                      ? 'bg-[#8B4513] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t(`gallery.categories.${category}`)}
                </button>
              ))}
            </div>
            <button
              onClick={handleZoom}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors shrink-0"
              aria-label={zoomLevel === 2 ? "Zoom out" : "Zoom in"}
            >
              {zoomLevel === 2 ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
          </div>

          {/* Gallery Grid */}
          <div className={`grid gap-6 transition-all duration-300 ${getGridCols()}`}>
            {media?.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-square">
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      poster={item.thumbnail_url}
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  )}
                </div>
                {item.title && (
                  <div className="p-4 border-t">
                    <h3 className="text-base font-medium line-clamp-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!media?.length && (
            <p className="text-center text-gray-500 mt-8">
              {t('gallery.noResults')}
            </p>
          )}

          {/* Image Preview Modal */}
          {selectedItem && (
            <ImagePreview
              src={selectedItem.url}
              alt={selectedItem.title}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Gallery;