import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { GalleryItem } from '../../../../types/gallery';

interface GalleryUploadModalProps {
  image?: GalleryItem | null;
  onClose: () => void;
  onSubmit: (data: Partial<GalleryItem>) => Promise<void>;
}

const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({
  image,
  onClose,
  onSubmit
}) => {
  const [preview, setPreview] = useState<string>(image?.url || '');
  const isEdit = Boolean(image);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {isEdit ? 'Edit Image' : 'Add Image'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  className="input mt-1"
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alt Text
                </label>
                <input
                  type="text"
                  className="input mt-1"
                  defaultValue={image?.alt || ''}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Caption
                </label>
                <input
                  type="text"
                  className="input mt-1"
                  defaultValue={image?.caption || ''}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select 
                  className="input mt-1"
                  defaultValue={image?.category || ''}
                >
                  <option value="">Select a category</option>
                  <option value="interior">Interior</option>
                  <option value="drinks">Drinks</option>
                  <option value="food">Food</option>
                  <option value="events">Events</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-gray-700">Preview</p>
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full aspect-square rounded-lg object-cover"
                />
              ) : (
                <div className="w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="mt-2 text-sm text-gray-600">
                      Enter an image URL above to see a preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEdit ? 'Save Changes' : 'Add Image'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryUploadModal;