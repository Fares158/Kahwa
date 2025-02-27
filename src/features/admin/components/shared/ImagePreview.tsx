import React from 'react';
import { Upload } from 'lucide-react';

interface ImagePreviewProps {
  url: string;
  alt: string;
}

const ImagePreview = ({ url, alt }: ImagePreviewProps) => {
  return (
    <div className="mt-2">
      {url ? (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={url}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">
              Enter an image URL above to see a preview
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;