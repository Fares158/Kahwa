import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src="https://www.kharjet.tn/wp-content/uploads/2019/04/versailles-ennasr.jpg"
              alt={t('about.image')}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#8B4513] mb-6">
              {t('about.title')}
            </h2>
            <p className="text-gray-600 mb-4">{t('about.story')}</p>
            <p className="text-gray-600 mb-4">{t('about.location')}</p>
            <p className="text-gray-600">{t('about.mission')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
