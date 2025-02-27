import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { getImageProps } from '../../utils/imageUtils';
import type { ImageFormat } from '../../types/image';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  format?: ImageFormat;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  priority = false,
  format = 'webp',
  placeholder,
  className,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { 
    srcSet, 
    fallbackSrc, 
    preloadProps 
  } = getImageProps({ src, width, format });

  useEffect(() => {
    if (priority && preloadProps) {
      const link = document.createElement('link');
      Object.entries(preloadProps).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, preloadProps]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {placeholder && !isLoaded && !error && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
      
      <picture>
        <source type="image/webp" srcSet={srcSet} sizes={sizes} />
        <img
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            !isLoaded && 'opacity-0',
            isLoaded && 'opacity-100'
          )}
          {...props}
        />
      </picture>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;