import React, { useState } from 'react';
import { useGallery } from '../../hooks/useGallery';
import { useLanguage } from '../../contexts/LanguageContext';
import ImagePreview from '../shared/ImagePreview';
import type { MediaItem, GalleryFilter } from '../../types/gallery';
import { ZoomIn, ZoomOut } from 'lucide-react';
import LoadingSpinner from '../shared/LoadingSpinner';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<GalleryFilter>({});
  const [isZoomed, setIsZoomed] = useState(false);

  const { media, loading, error } = useGallery(filter);

  const categories = ['all', 'interior', 'drinks', 'food', 'events'];

  const handleCategoryChange = (category: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFilter(prev => ({
      ...prev,
      category: category === 'all' ? undefined : category
    }));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (loading) {
    return (
      <main className="pt-16 bg-[#F5F5DC]">
        <section className="py-16">
          <div className="container-custom">
            <h1 className="heading-1 text-center mb-12">{t('gallery.title')}</h1>
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
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
    )
  }
}