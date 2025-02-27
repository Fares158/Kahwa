import React from 'react';
import { cn } from '../../utils/cn';
import { GalleryItem } from '../../types/gallery';

interface GalleryImageProps {
  image: GalleryItem;
  onClick: () => void;
  priority?: boolean;
  className?: string;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ 
  image, 
  onClick,
  priority = false,
  className
}) => {
  return (
    <div 
      className={cn(
        "group cursor-pointer overflow-hidden rounded-lg shadow-md",
        "hover:shadow-lg transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <img
          src={image.url}
          alt={image.alt}
          loading={priority ? "eager" : "lazy"}
          className={cn(
            "w-full h-full object-cover",
            "transform transition-transform duration-300",
            "group-hover:scale-105"
          )}
        />
        <div className={cn(
          "absolute inset-0 bg-black/0 group-hover:bg-black/20",
          "transition-colors duration-300"
        )} />
      </div>
      {image.caption && (
        <div className={cn(
          "absolute bottom-0 left-0 right-0",
          "p-4 bg-gradient-to-t from-black/60 to-transparent",
          "text-white opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300"
        )}>
          <p className="text-sm font-medium">{image.caption}</p>
        </div>
      )}
    </div>
  );
};

export default GalleryImage;