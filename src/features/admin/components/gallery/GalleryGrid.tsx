import React from 'react';
import { Edit2, Trash2, Star } from 'lucide-react';
import { GalleryItem } from '../../../../types/gallery';
import { galleryData } from '../../../../data/galleryData';

interface GalleryGridProps {
  onEditImage: (image: GalleryItem) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ onEditImage }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryData.map((image) => (
        <div 
          key={image.id}
          className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full aspect-square object-cover"
          />
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 flex items-center justify-center gap-4">
              <button
                onClick={() => onEditImage(image)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                aria-label="Edit image"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-white/10 hover:bg-red-500/80 rounded-lg text-white transition-colors"
                aria-label="Delete image"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 border-t">
            <p className="font-medium truncate">{image.caption || 'Untitled'}</p>
            <p className="text-sm text-gray-600">{image.category || 'Uncategorized'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;