import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { AdminSettings } from '../../../types';

const GeneralSettings = () => {
  const [settings, setSettings] = useState<Partial<AdminSettings>>({
    siteName: 'The Cast',
    logo: '/logo.svg',
    defaultLanguage: 'en'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving general settings:', settings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Name
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo URL
          </label>
          <input
            type="url"
            value={settings.logo}
            onChange={(e) => setSettings(prev => ({ ...prev, logo: e.target.value }))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Language
          </label>
          <select
            value={settings.defaultLanguage}
            onChange={(e) => setSettings(prev => ({ ...prev, defaultLanguage: e.target.value }))}
            className="input"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
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

export default GeneralSettings;