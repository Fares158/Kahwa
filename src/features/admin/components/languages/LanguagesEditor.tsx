import React, { useState } from 'react';
import { Save, Globe, Check } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { translations } from '../../../../translations';

const LanguagesEditor = () => {
  const { language } = useLanguage();
  const [defaultLanguage, setDefaultLanguage] = useState('en');
  const [enabledLanguages, setEnabledLanguages] = useState(['en', 'fr']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving language settings:', {
      defaultLanguage,
      enabledLanguages
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Languages Management</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Language Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Language
                </label>
                <select
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                  className="input"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enabled Languages
                </label>
                <div className="space-y-2">
                  {Object.keys(translations).map((lang) => (
                    <label key={lang} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={enabledLanguages.includes(lang)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEnabledLanguages([...enabledLanguages, lang]);
                          } else {
                            setEnabledLanguages(enabledLanguages.filter(l => l !== lang));
                          }
                        }}
                        disabled={lang === defaultLanguage}
                      />
                      <span>{lang === 'en' ? 'English' : 'French'}</span>
                      {lang === defaultLanguage && (
                        <span className="text-xs text-gray-500">(Default)</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LanguagesEditor;