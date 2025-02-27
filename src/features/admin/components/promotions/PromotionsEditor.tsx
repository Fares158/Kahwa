import React, { useState } from 'react';
import { Save, Plus, Trash2, Calendar } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import ImageUpload from '../shared/ImageUpload';
import LanguageToggle from '../shared/LanguageToggle';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

const PromotionsEditor = () => {
  const { language } = useLanguage();
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const handleAddPromotion = () => {
    const newPromotion: Promotion = {
      id: Date.now().toString(),
      title: '',
      description: '',
      image: '',
      startDate: '',
      endDate: '',
      active: true
    };
    setPromotions([...promotions, newPromotion]);
  };

  const handleRemovePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };

  const handlePromotionChange = (id: string, field: keyof Promotion, value: string | boolean) => {
    setPromotions(promotions.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving promotions:', promotions);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Promotions Management</h2>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button
            onClick={handleAddPromotion}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Promotion
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {promotions.map((promotion) => (
          <div key={promotion.id} className="bg-white rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">Promotion Details</h3>
              <button
                type="button"
                onClick={() => handleRemovePromotion(promotion.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title ({language})
                  </label>
                  <input
                    type="text"
                    value={promotion.title}
                    onChange={(e) => handlePromotionChange(promotion.id, 'title', e.target.value)}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description ({language})
                  </label>
                  <textarea
                    value={promotion.description}
                    onChange={(e) => handlePromotionChange(promotion.id, 'description', e.target.value)}
                    className="input"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={promotion.startDate}
                      onChange={(e) => handlePromotionChange(promotion.id, 'startDate', e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={promotion.endDate}
                      onChange={(e) => handlePromotionChange(promotion.id, 'endDate', e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={promotion.active}
                    onChange={(e) => handlePromotionChange(promotion.id, 'active', e.target.checked)}
                    id={`active-${promotion.id}`}
                  />
                  <label htmlFor={`active-${promotion.id}`}>Active</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Promotion Image
                </label>
                <ImageUpload
                  onImageSelect={(file) => {
                    // In a real app, handle file upload and get URL
                    const imageUrl = URL.createObjectURL(file);
                    handlePromotionChange(promotion.id, 'image', imageUrl);
                  }}
                  preview={promotion.image}
                />
              </div>
            </div>
          </div>
        ))}

        {promotions.length > 0 && (
          <div className="flex justify-end">
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PromotionsEditor;