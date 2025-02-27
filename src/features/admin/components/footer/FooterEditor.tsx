import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Save } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../shared/Tabs';
import LanguageToggle from '../shared/LanguageToggle';

const FooterEditor = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState({
    content: {
      address: '',
      phone: '',
      email: '',
    },
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
    },
    legalInfo: {
      copyrightText: '',
      privacyPolicyLink: '',
      termsOfServiceLink: '',
    },
  });

  useEffect(() => {
    // Fetch footer data here
    console.log('Fetching footer data for language:', language);
  }, [language]);

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section as keyof typeof prevData],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving footer:', formData);
    // Implement save logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('footerEditor')}</h2>
        <LanguageToggle />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">{t('content')}</TabsTrigger>
          <TabsTrigger value="socialLinks">{t('socialLinks')}</TabsTrigger>
          <TabsTrigger value="legalInfo">{t('legalInfo')}</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TabsContent value="content">
            {/* Content fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('address')}</label>
                <input
                  type="text"
                  value={formData.content.address}
                  onChange={(e) => handleInputChange('content', 'address', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              {/* Add more content fields here */}
            </div>
          </TabsContent>

          <TabsContent value="socialLinks">
            {/* Social links fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('facebook')}</label>
                <input
                  type="text"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => handleInputChange('socialLinks', 'facebook', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              {/* Add more social link fields here */}
            </div>
          </TabsContent>

          <TabsContent value="legalInfo">
            {/* Legal info fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('copyrightText')}</label>
                <input
                  type="text"
                  value={formData.legalInfo.copyrightText}
                  onChange={(e) => handleInputChange('legalInfo', 'copyrightText', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              {/* Add more legal info fields here */}
            </div>
          </TabsContent>

          <div className="flex justify-end">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Save className="w-4 h-4 mr-2" />
              {t('saveChanges')}
            </button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default FooterEditor;