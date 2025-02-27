import React from 'react';
import { Edit2, Trash2, Folder, Image, Video } from 'lucide-react';
import type { MediaItem, Folder as FolderType } from '../../../../types/gallery';
import LoadingSpinner from '../../../../components/shared/LoadingSpinner';

interface GalleryGridProps {
  media: MediaItem[];
  folders: FolderType[];
  loading: boolean;
  onEditMedia: (media: MediaItem) => void;
  onDeleteMedia: (id: string, url: string) => void;
  onEditFolder: (folder: FolderType) => void;
  onDeleteFolder: (id: string) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  media,
  folders,
  loading,
  onEditMedia,
  onDeleteMedia,
  onEditFolder,
  onDeleteFolder
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Folders */}
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden group"
        >
          <div className="p-4 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium truncate">{folder.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{folder.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditFolder(folder)}
                className="p-1 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                title="Edit folder"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteFolder(folder.id)}
                className="p-1 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                title="Delete folder"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Media Items */}
      {media.map((item) => (
        <div
          key={item.id}
          className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="relative aspect-square">
            {item.type === 'video' ? (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                poster={item.thumbnail_url}
              />
            ) : (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-2 right-2">
              {item.type === 'video' ? (
                <Video className="w-5 h-5 text-white drop-shadow-lg" />
              ) : (
                <Image className="w-5 h-5 text-white drop-shadow-lg" />
              )}
            </div>
          </div>

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 flex items-center justify-center gap-4">
              <button
                onClick={() => onEditMedia(item)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Edit media"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDeleteMedia(item.id, item.url)}
                className="p-2 bg-white/10 hover:bg-red-500/80 rounded-lg text-white transition-colors"
                title="Delete media"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 border-t">
            <h3 className="font-medium truncate">{item.title}</h3>
            {item.folder && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Folder className="w-4 h-4" />
                {item.folder.name}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;