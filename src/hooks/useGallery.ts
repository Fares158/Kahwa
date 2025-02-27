import { useState, useEffect } from 'react';
import * as galleryApi from '../lib/supabase/gallery';
import type { MediaItem, Folder, GalleryFilter } from '../types/gallery';

export function useGallery(filter?: GalleryFilter) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [mediaData, foldersData] = await Promise.all([
          galleryApi.fetchMedia(filter),
          galleryApi.fetchFolders(filter?.category)
        ]);
        
        setMedia(mediaData);
        setFolders(foldersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch gallery data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filter]);

  const uploadMedia = async (file: File, metadata: Omit<MediaItem, 'id' | 'url' | 'created_at' | 'updated_at'>) => {
    try {
      const newMedia = await galleryApi.uploadMedia(file, metadata);
      setMedia(prev => [newMedia, ...prev]);
      return newMedia;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to upload media');
    }
  };

  const updateMedia = async (id: string, updates: Partial<MediaItem>) => {
    try {
      const updatedMedia = await galleryApi.updateMedia(id, updates);
      setMedia(prev => prev.map(item => 
        item.id === id ? updatedMedia : item
      ));
      return updatedMedia;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update media');
    }
  };

  const deleteMedia = async (id: string, url: string) => {
    try {
      await galleryApi.deleteMedia(id, url);
      setMedia(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete media');
    }
  };

  const createFolder = async (folder: Omit<Folder, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newFolder = await galleryApi.createFolder(folder);
      setFolders(prev => [...prev, newFolder]);
      return newFolder;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create folder');
    }
  };

  const updateFolder = async (id: string, updates: Partial<Folder>) => {
    try {
      const updatedFolder = await galleryApi.updateFolder(id, updates);
      setFolders(prev => prev.map(folder => 
        folder.id === id ? updatedFolder : folder
      ));
      return updatedFolder;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update folder');
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      await galleryApi.deleteFolder(id);
      setFolders(prev => prev.filter(folder => folder.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete folder');
    }
  };

  return {
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
  };
}