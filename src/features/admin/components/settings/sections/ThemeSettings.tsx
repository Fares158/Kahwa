import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  fontFamily: string;
}

const ThemeSettings = () => {
  const [theme, setTheme] = useState<ThemeConfig>({
    primary: '#8B4513',
    secondary: '#1A1A1A',
    accent: '#E5B94C',
    background: '#FFFFFF',
    text: '#1A1A1A',
    fontFamily: 'Courier Prime'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving theme settings:', theme);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Colors</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.primary}
                  onChange={(e) => setTheme(prev => ({ ...prev, primary: e.target.value }))}
                  className="h-10 w-20"
                />
                <input
                  type="text"
                  value={theme.primary}
                  onChange={(e) => setTheme(prev => ({ ...prev, primary: e.target.value }))}
                  className="input flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.secondary}
                  onChange={(e) => setTheme(prev => ({ ...prev, secondary: e.target.value }))}
                  className="h-10 w-20"
                />
                <input
                  type="text"
                  value={theme.secondary}
                  onChange={(e) => setTheme(prev => ({ ...prev, secondary: e.target.value }))}
                  className="input flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accent Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.accent}
                  onChange={(e) => setTheme(prev => ({ ...prev, accent: e.target.value }))}
                  className="h-10 w-20"
                />
                <input
                  type="text"
                  value={theme.accent}
                  onChange={(e) => setTheme(prev => ({ ...prev, accent: e.target.value }))}
                  className="input flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Typography</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Family
              </label>
              <select
                value={theme.fontFamily}
                onChange={(e) => setTheme(prev => ({ ...prev, fontFamily: e.target.value }))}
                className="input"
              >
                <option value="Courier Prime">Courier Prime</option>
                <option value="system-ui">System UI</option>
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans Serif</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.text}
                  onChange={(e) => setTheme(prev => ({ ...prev, text: e.target.value }))}
                  className="h-10 w-20"
                />
                <input
                  type="text"
                  value={theme.text}
                  onChange={(e) => setTheme(prev => ({ ...prev, text: e.target.value }))}
                  className="input flex-1"
                />
              </div>
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
    </form>
  );
};

export default ThemeSettings;