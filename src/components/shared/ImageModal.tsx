import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="h-8 w-8" />
      </button>
      <img
        src={src}
        alt="Gallery preview"
        className="max-w-full max-h-[90vh] object-contain"
      />
    </div>
  );
};

export default ImageModal;