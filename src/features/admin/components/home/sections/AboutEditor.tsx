import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import ImagePreview from '../../shared/ImagePreview';

const AboutEditor = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    image: 'https://www.kharjet.tn/wp-content/uploads/2019/04/versailles-ennasr.jpg',
    title: t('about.title'),
    story: t('about.story'),
    location: t('about.location'),
    mission: t('about.mission')
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving about section:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            className="input"
            required
          />
          <ImagePreview url={formData.image} alt="About section" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title ({language})
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Story ({language})
          </label>
          <textarea
            value={formData.story}
            onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
            className="input"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location ({language})
          </label>
          <textarea
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="input"
            rows={2}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mission ({language})
          </label>
          <textarea
            value={formData.mission}
            onChange={(e) => setFormData(prev => ({ ...prev, mission: e.target.value }))}
            className="input"
            rows={2}
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

export default AboutEditor;