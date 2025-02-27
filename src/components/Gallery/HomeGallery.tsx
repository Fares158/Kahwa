import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImagePreview from '../shared/ImagePreview';

// Static gallery items for home page
const galleryItems = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
    alt: 'Vintage cinema details',
    caption: 'Classic Cinema Ambiance',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    alt: 'Coffee brewing process',
    caption: 'Artisanal Coffee Brewing',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    alt: 'Cozy cafe interior',
    caption: 'Our Welcoming Space',
  },
];

const HomeGallery = () => {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryItems)[0] | null
  >(null);
  const { t } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollAmount = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section-padding bg-white" id="gallery">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-12">{t('gallery.title')}</h2>
        <div className="max-w-6xl mx-auto relative group">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryItems.map((image) => (
              <div
                key={image.id}
                className="flex-none w-full sm:w-1/2 lg:w-1/3 snap-start px-2"
              >
                <div
                  className="group cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-square">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-center p-4">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            aria-label="Previous images"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next images"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('gallery.ViewFullGallery')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {selectedImage && (
        <ImagePreview
          src={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default HomeGallery;
