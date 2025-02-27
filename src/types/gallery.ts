export interface Folder {
  id: string;
  name: string;
  category: 'interior' | 'drinks' | 'food' | 'events';
  description?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  category: 'interior' | 'drinks' | 'food' | 'events';
  folder_id?: string;
  folder?: Folder;
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    size?: number;
  };
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryFilter {
  category?: string;
  folderId?: string;
  type?: 'image' | 'video';
}