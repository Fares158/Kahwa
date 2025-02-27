import type { ImageFormat } from '../types/image';

interface ImageProps {
  src: string;
  width?: number;
  format?: ImageFormat;
}

interface ImageConfig {
  srcSet: string;
  fallbackSrc: string;
  preloadProps?: Record<string, string>;
}

const FALLBACK_IMAGE = '/placeholder.jpg';
const IMAGE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const IMAGE_QUALITY = 75;

export function getImageProps({ src, width, format = 'webp' }: ImageProps): ImageConfig {
  try {
    // Handle remote URLs (e.g., Unsplash)
    if (src.startsWith('http')) {
      const url = new URL(src);
      
      // Generate srcSet for different sizes
      const srcSet = IMAGE_SIZES.map(size => {
        const params = new URLSearchParams({
          w: size.toString(),
          q: IMAGE_QUALITY.toString(),
          fm: format
        });
        return `${url.origin}${url.pathname}?${params.toString()} ${size}w`;
      }).join(', ');

      return {
        srcSet,
        fallbackSrc: src,
        preloadProps: width ? {
          rel: 'preload',
          as: 'image',
          href: `${url.origin}${url.pathname}?w=${width}&q=${IMAGE_QUALITY}&fm=${format}`,
          type: `image/${format}`
        } : undefined
      };
    }

    // Handle local images (implement your own image processing logic here)
    return {
      srcSet: src,
      fallbackSrc: src
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return {
      srcSet: FALLBACK_IMAGE,
      fallbackSrc: FALLBACK_IMAGE
    };
  }
}