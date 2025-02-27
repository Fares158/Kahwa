import React from 'react';
import type { GalleryFilter, Folder } from '../../../../types/gallery';

interface GalleryFiltersProps {
  filter: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
  folders: Folder[];
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  filter,
  onChange,
  folders
}) => {
  const categories = ['interior', 'drinks', 'food', 'events'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filter.category || ''}
            onChange={(e) => onChange({ ...filter, category: e.target.value || undefined })}
            className="input"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Folder
          </label>
          <select
            value={filter.folderId || ''}
            onChange={(e) => onChange({ ...filter, folderId: e.target.value || undefined })}
            className="input"
          >
            <option value="">All Folders</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filter.type || ''}
            onChange={(e) => onChange({ ...filter, type: e.target.value as 'image' | 'video' | undefined })}
            className="input"
          >
            <option value="">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GalleryFilters;