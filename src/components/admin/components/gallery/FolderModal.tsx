import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Folder } from '../../../../types/gallery';

interface FolderModalProps {
  folder?: Folder | null;
  onClose: () => void;
  onSubmit: (data: Omit<Folder, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

const FolderModal: React.FC<FolderModalProps> = ({
  folder,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Omit<Folder, 'id' | 'created_at' | 'updated_at'>>({
    name: folder?.name || '',
    category: folder?.category || 'interior',
    description: folder?.description || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md my-8">
          <div className="sticky top-0 px-6 py-4 border-b bg-white rounded-t-lg flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {folder ? 'Edit Folder' : 'New Folder'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Folder Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Folder['category'] }))}
                className="input"
                required
              >
                <option value="interior">Interior</option>
                <option value="drinks">Drinks</option>
                <option value="food">Food</option>
                <option value="events">Events</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="input"
                rows={3}
              />
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : folder ? 'Save Changes' : 'Create Folder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FolderModal;