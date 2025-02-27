import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import ImagePreview from '../../shared/ImagePreview';

interface Special {
  id: string;
  name: string;
  image: string;
  price: string;
}

const SpecialsEditor = () => {
  const { t } = useLanguage();
  const [specials, setSpecials] = useState<Special[]>([
    {
      id: '1',
      name: 'Tony breakfast',
      image:
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80',
      price: '$4',
    },
    {
      id: '2',
      name: 'Artisan',
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80',
      price: '$5.00',
    },
    {
      id: '3',
      name: 'House Special Mocha',
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80',
      price: '$5.50',
    },
  ]);

  const handleAddSpecial = () => {
    setSpecials([
      ...specials,
      {
        id: Date.now().toString(),
        name: '',
        image: '',
        price: '',
      },
    ]);
  };

  const handleRemoveSpecial = (id: string) => {
    setSpecials(specials.filter((s) => s.id !== id));
  };

  const handleSpecialChange = (
    id: string,
    field: keyof Special,
    value: string
  ) => {
    setSpecials(
      specials.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving specials:', specials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
      <div className="space-y-4">
        {specials.map((special) => (
          <div key={special.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Special Item {special.id}</h4>
              <button
                type="button"
                onClick={() => handleRemoveSpecial(special.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={special.name}
                  onChange={(e) =>
                    handleSpecialChange(special.id, 'name', e.target.value)
                  }
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={special.price}
                  onChange={(e) =>
                    handleSpecialChange(special.id, 'price', e.target.value)
                  }
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={special.image}
                onChange={(e) =>
                  handleSpecialChange(special.id, 'image', e.target.value)
                }
                className="input"
                required
              />
              <ImagePreview url={special.image} alt={special.name} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddSpecial}
          className="btn-secondary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Special
        </button>

        <button type="submit" className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SpecialsEditor;
