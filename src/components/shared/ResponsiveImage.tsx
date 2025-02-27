import React from 'react';
import { cn } from '../../utils/cn';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'custom';
  objectFit?: 'cover' | 'contain';
  containerClassName?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = 'custom',
  objectFit = 'cover',
  className,
  containerClassName,
  ...props
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    custom: ''
  };

  return (
    <div className={cn(
      'overflow-hidden',
      aspectRatioClasses[aspectRatio],
      containerClassName
    )}>
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-center transition-transform duration-300',
          `object-${objectFit}`,
          className
        )}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ResponsiveImage;