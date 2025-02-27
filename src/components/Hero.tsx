import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clapperboard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://fastly.4sqi.net/img/general/600x600/X68nmERSKGeAXHI02ypFGulgrH4sa4ukaB5rjflJ08E.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <div className="flex justify-center mb-6">
            <Clapperboard className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-mono">
            {t('hero.welcome')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-mono">
            {t('hero.subtitle')}
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors duration-200 font-mono"
          >
            {t('hero.cta')}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
