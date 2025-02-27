import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { GalleryItem } from '../../types/gallery';

interface LightboxProps {
  image: GalleryItem | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!image) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-black/90",
        "flex items-center justify-center",
        "animate-fadeIn"
      )}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className={cn(
          "absolute top-4 right-4 text-white/80",
          "hover:text-white transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-white/20"
        )}
      >
        <X className="h-8 w-8" />
      </button>
      
      <div 
        className="max-w-7xl mx-auto px-4 py-8"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.alt}
          className={cn(
            "max-w-full max-h-[90vh]",
            "object-contain mx-auto",
            "animate-scaleIn"
          )}
        />
        {image.caption && (
          <p className="text-white/90 text-center mt-4">
            {image.caption}
          </p>
        )}
      </div>
    </div>
  );
};

export default Lightbox;