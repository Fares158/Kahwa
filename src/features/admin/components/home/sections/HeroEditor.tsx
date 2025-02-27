import React, { useState } from 'react';
import { Save } from 'lucide-react';
import ImagePreview from '../../shared/ImagePreview';
import { useLanguage } from '../../../../../contexts/LanguageContext';

const HeroEditor = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    backgroundImage:
      'https://fastly.4sqi.net/img/general/600x600/X68nmERSKGeAXHI02ypFGulgrH4sa4ukaB5rjflJ08E.jpg',
    welcome: t('hero.welcome'),
    subtitle: t('hero.subtitle'),
    cta: t('hero.cta'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving hero section:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Image URL
          </label>
          <input
            type="url"
            value={formData.backgroundImage}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                backgroundImage: e.target.value,
              }))
            }
            className="input"
            required
          />
          <ImagePreview url={formData.backgroundImage} alt="Hero background" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Welcome Text ({language})
          </label>
          <input
            type="text"
            value={formData.welcome}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, welcome: e.target.value }))
            }
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle ({language})
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
            }
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA Button Text ({language})
          </label>
          <input
            type="text"
            value={formData.cta}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, cta: e.target.value }))
            }
            className="input"
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default HeroEditor;
