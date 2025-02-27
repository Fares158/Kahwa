import React from 'react';
import { cn } from '../../utils/cn';
import GalleryImage from './GalleryImage';
import { GalleryItem } from '../../types/gallery';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface GalleryGridProps {
  images: GalleryItem[];
  onImageClick: (image: GalleryItem) => void;
  className?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  images, 
  onImageClick,
  className 
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={toggleZoom}
          className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
        </button>
      </div>
      <div className={cn(
        "grid gap-6 transition-all duration-300",
        isZoomed ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}>
        {images.map((image, index) => (
          <GalleryImage
            key={image.id}
            image={image}
            onClick={() => onImageClick(image)}
            priority={index < 6}
            className={cn(
              isZoomed && "aspect-video"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;