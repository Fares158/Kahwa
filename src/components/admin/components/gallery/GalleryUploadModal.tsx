import React, { useState, useRef } from 'react';
import { X, Upload, Folder } from 'lucide-react';
import type { MediaItem, Folder as FolderType } from '../../../../types/gallery';

interface GalleryUploadModalProps {
  folders: FolderType[];
  onClose: () => void;
  onUpload: (files: FileList, metadata: Partial<MediaItem>) => Promise<void>;
}

const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({
  folders,
  onClose,
  onUpload
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [metadata, setMetadata] = useState<Partial<MediaItem>>({
    category: 'interior'
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files?.length) return;

    try {
      setIsUploading(true);
      await onUpload(files, metadata);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl my-8">
          <div className="sticky top-0 px-6 py-4 border-b bg-white rounded-t-lg flex items-center justify-between">
            <h3 className="text-lg font-semibold">Upload Media</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => setFiles(e.target.files)}
                multiple
                accept="image/*,video/*"
                className="hidden"
              />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop<br />
                <span className="text-xs">Images and videos up to 100MB</span>
              </p>
              {files && (
                <div className="mt-4 text-sm text-gray-600">
                  Selected {files.length} file(s)
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={metadata.category}
                  onChange={(e) => setMetadata(prev => ({ ...prev, category: e.target.value }))}
                  className="input"
                  required
                >
                  <option value="interior">Interior</option>
                  <option value="drinks">Drinks</option>
                  <option value="food">Food</option>
                  <option value="events">Events</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Folder (Optional)
                </label>
                <select
                  value={metadata.folder_id || ''}
                  onChange={(e) => setMetadata(prev => ({ ...prev, folder_id: e.target.value || undefined }))}
                  className="input"
                >
                  <option value="">No Folder</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={metadata.description || ''}
                onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                className="input"
                rows={3}
              />
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={!files?.length || isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GalleryUploadModal;