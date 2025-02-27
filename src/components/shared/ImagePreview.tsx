import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ImagePreviewProps {
  src: string;
  alt: string;
  onClose?: () => void;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  objectFit?: 'cover' | 'contain';
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  onClose,
  className,
  aspectRatio = 'square',
  objectFit = 'cover'
}) => {
  if (!src) return null;

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          aria-label="Close preview"
        >
          <X className="w-6 h-6" />
        </button>
      )}
      
      <div className="max-w-4xl w-full">
        <div className={cn(
          'relative overflow-hidden rounded-lg',
          aspectRatioClasses[aspectRatio],
          className
        )}>
          <img
            src={src}
            alt={alt}
            className={cn(
              'w-full h-full transition-transform duration-300',
              `object-${objectFit}`
            )}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;