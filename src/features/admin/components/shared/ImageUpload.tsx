import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import ResponsiveImage from '../../../../components/shared/ResponsiveImage';
import { cn } from '../../../../utils/cn';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  preview?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  preview,
  className,
  aspectRatio = 'square'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-4 transition-colors',
          'hover:border-primary cursor-pointer',
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300',
          className
        )}
      >
        {preview ? (
          <div className="relative group">
            <ResponsiveImage
              src={preview}
              alt="Preview"
              aspectRatio={aspectRatio}
              containerClassName="rounded-lg overflow-hidden"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-sm">Click or drag to replace</p>
            </div>
          </div>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-gray-500">
            <Upload className="w-8 h-8 mb-2" />
            <p className="text-sm text-center">
              Click to upload or drag and drop<br />
              <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
            </p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onImageSelect(file);
        }}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;