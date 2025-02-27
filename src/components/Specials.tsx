import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Specials = () => {
  const { t } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const specialItems = [
    {
      id: '1',
      name: t('specials.items.signatureLatte.name'),
      description: t('specials.items.signatureLatte.description'),
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80',
      price: t('specials.items.signatureLatte.price')
    },
    {
      id: '2',
      name: t('specials.items.pourOver.name'),
      description: t('specials.items.pourOver.description'),
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80',
      price: t('specials.items.pourOver.price')
    },
    {
      id: '3',
      name: t('specials.items.mocha.name'),
      description: t('specials.items.mocha.description'),
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80',
      price: t('specials.items.mocha.price')
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-16" id="specials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#8B4513] mb-12">
          {t('specials.title')}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {t('specials.subtitle')}
        </p>

        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specialItems.map((item) => (
              <div
                key={item.id}
                className="flex-none w-full sm:w-1/2 lg:w-1/3 snap-start px-2"
              >
                <div className="group relative overflow-hidden rounded-lg shadow-md">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                    <p className="text-white/90 mb-2">{item.description}</p>
                    <p className="text-white/90">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous specials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next specials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Specials;