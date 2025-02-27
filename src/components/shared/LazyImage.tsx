import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import OptimizedImage from './OptimizedImage';
import type { ImageFormat } from '../../types/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  format?: ImageFormat;
  threshold?: number;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  format,
  threshold = 0.1,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={imageRef} className={className}>
      {isVisible ? (
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          format={format}
          className={cn('w-full h-full')}
        />
      ) : (
        <div 
          className="w-full h-full bg-gray-100 animate-pulse"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        />
      )}
    </div>
  );
};

export default LazyImage;