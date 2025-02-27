import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../../../../contexts/LanguageContext';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const FeaturesEditor = () => {
  const { t, language } = useLanguage();
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      icon: 'Coffee',
      title: t('features.coffee'),
      description: t('features.coffee_desc')
    },
    {
      id: '2',
      icon: 'Sofa',
      title: t('features.ambiance'),
      description: t('features.ambiance_desc')
    },
    {
      id: '3',
      icon: 'Clapperboard',
      title: t('features.wifi'),
      description: t('features.wifi_desc')
    }
  ]);

  const handleAddFeature = () => {
    setFeatures([...features, {
      id: Date.now().toString(),
      icon: 'Coffee',
      title: '',
      description: ''
    }]);
  };

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const handleFeatureChange = (id: string, field: keyof Feature, value: string) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving features:', features);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Feature {feature.id}</h4>
              <button
                type="button"
                onClick={() => handleRemoveFeature(feature.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon Name
                </label>
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => handleFeatureChange(feature.id, 'icon', e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title ({language})
                </label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description ({language})
              </label>
              <textarea
                value={feature.description}
                onChange={(e) => handleFeatureChange(feature.id, 'description', e.target.value)}
                className="input"
                rows={2}
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddFeature}
          className="btn-secondary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Feature
        </button>

        <button type="submit" className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default FeaturesEditor;