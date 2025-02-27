import React, { useState } from 'react';
import { Plus, FolderPlus } from 'lucide-react';
import { useGallery } from '../../../../hooks/useGallery';
import GalleryGrid from './GalleryGrid';
import GalleryUploadModal from './GalleryUploadModal';
import FolderModal from './FolderModal';
import GalleryFilters from './GalleryFilters';
import type { MediaItem, Folder, GalleryFilter } from '../../../../types/gallery';
import { toast } from 'react-hot-toast';

const GalleryEditor = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [filter, setFilter] = useState<GalleryFilter>({});

  const {
    media,
    folders,
    loading,
    error,
    uploadMedia,
    updateMedia,
    deleteMedia,
    createFolder,
    updateFolder,
    deleteFolder
  } = useGallery(filter);

  const handleUpload = async (files: FileList, metadata: Partial<MediaItem>) => {
    try {
      const uploadPromises = Array.from(files).map(file => {
        const type = file.type.startsWith('video/') ? 'video' : 'image';
        return uploadMedia(file, {
          title: file.name,
          type,
          category: metadata.category || 'interior',
          folder_id: metadata.folder_id,
          description: metadata.description
        });
      });

      await Promise.all(uploadPromises);
      toast.success('Files uploaded successfully');
      setIsUploadModalOpen(false);
    } catch (err) {
      toast.error('Failed to upload files');
      console.error('Upload error:', err);
    }
  };

  const handleCreateFolder = async (folderData: Omit<Folder, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await createFolder(folderData);
      toast.success('Folder created successfully');
      setIsFolderModalOpen(false);
    } catch (err) {
      toast.error('Failed to create folder');
      console.error('Create folder error:', err);
    }
  };

  const handleUpdateFolder = async (id: string, updates: Partial<Folder>) => {
    try {
      await updateFolder(id, updates);
      toast.success('Folder updated successfully');
      setIsFolderModalOpen(false);
      setSelectedFolder(null);
    } catch (err) {
      toast.error('Failed to update folder');
      console.error('Update folder error:', err);
    }
  };

  const handleDeleteFolder = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this folder? Media items will be moved to their respective categories.')) {
      return;
    }

    try {
      await deleteFolder(id);
      toast.success('Folder deleted successfully');
    } catch (err) {
      toast.error('Failed to delete folder');
      console.error('Delete folder error:', err);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading gallery: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gallery Management</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFolderModalOpen(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Media
          </button>
        </div>
      </div>

      <GalleryFilters
        filter={filter}
        onChange={setFilter}
        folders={folders}
      />

      <GalleryGrid
        media={media}
        folders={folders}
        loading={loading}
        onEditMedia={setSelectedMedia}
        onDeleteMedia={deleteMedia}
        onEditFolder={setSelectedFolder}
        onDeleteFolder={handleDeleteFolder}
      />

      {isUploadModalOpen && (
        <GalleryUploadModal
          folders={folders}
          onClose={() => {
            setIsUploadModalOpen(false);
            setSelectedMedia(null);
          }}
          onUpload={handleUpload}
        />
      )}

      {isFolderModalOpen && (
        <FolderModal
          folder={selectedFolder}
          onClose={() => {
            setIsFolderModalOpen(false);
            setSelectedFolder(null);
          }}
          onSubmit={selectedFolder ? 
            (updates) => handleUpdateFolder(selectedFolder.id, updates) : 
            handleCreateFolder
          }
        />
      )}
    </div>
  );
};

export default GalleryEditor;