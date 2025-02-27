import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded ${
          language === 'en'
            ? 'bg-[#8B4513] text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-2 py-1 rounded ${
          language === 'fr'
            ? 'bg-[#8B4513] text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitch;