import React from 'react';
import { Wifi, Sofa } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import FeatureCard from './FeatureCard';

const ChichaIcon = () => (
  <div className="flex items-center justify-center">
    <img 
      src="https://img.icons8.com/?size=66&id=biyyamsZil1o&format=png" 
      alt="Chicha"
      className="w-12 h-12 md:w-[48px] md:h-[48px] brightness-0 opacity-90 filter mb-4" 
      style={{ filter: 'invert(76%) sepia(38%) saturate(638%) hue-rotate(358deg) brightness(91%) contrast(91%)' }}
    />
  </div>
);

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Wifi,
      title: t('features.wifi'),
    },
    {
      icon: Sofa,
      title: t('features.ambiance'),
    },
    {
      icon: ChichaIcon,
      title: t('features.chichas'),
    }
  ];

  return (
    <section className="py-16 bg-black" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#E5B94C] mb-12 font-mono">
          {t('features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;