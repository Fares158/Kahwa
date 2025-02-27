import { supabase } from './client';
import type { MediaItem, Folder, GalleryFilter } from '../../types/gallery';

export async function fetchMedia(filter?: GalleryFilter) {
  let query = supabase
    .from('media')
    .select(`
      *,
      folders (
        id,
        name,
        category,
        description
      )
    `)
    .order('created_at', { ascending: false });

  if (filter?.category) {
    query = query.eq('category', filter.category);
  }
  if (filter?.folderId) {
    query = query.eq('folder_id', filter.folderId);
  }
  if (filter?.type) {
    query = query.eq('type', filter.type);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching media:', error);
    throw error;
  }

  return data as MediaItem[];
}

export async function fetchFolders(category?: string) {
  let query = supabase
    .from('folders')
    .select('*')
    .order('name');

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching folders:', error);
    throw error;
  }

  return data as Folder[];
}

export async function createFolder(folder: Omit<Folder, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('folders')
    .insert([folder])
    .select()
    .single();

  if (error) {
    console.error('Error creating folder:', error);
    throw error;
  }

  return data as Folder;
}

export async function updateFolder(id: string, updates: Partial<Folder>) {
  const { data, error } = await supabase
    .from('folders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating folder:', error);
    throw error;
  }

  return data as Folder;
}

export async function deleteFolder(id: string) {
  const { error } = await supabase
    .from('folders')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting folder:', error);
    throw error;
  }
}

export async function uploadMedia(file: File, metadata: Omit<MediaItem, 'id' | 'url' | 'created_at' | 'updated_at'>) {
  // Upload file to Supabase Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `gallery/${metadata.type}s/${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('media')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    throw uploadError;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath);

  // Create database entry
  const { data, error } = await supabase
    .from('media')
    .insert([{
      ...metadata,
      url: publicUrl
    }])
    .select()
    .single();

  if (error) {
    // Cleanup uploaded file if database insert fails
    await supabase.storage.from('media').remove([filePath]);
    console.error('Error creating media entry:', error);
    throw error;
  }

  return data as MediaItem;
}

export async function updateMedia(id: string, updates: Partial<MediaItem>) {
  const { data, error } = await supabase
    .from('media')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating media:', error);
    throw error;
  }

  return data as MediaItem;
}

export async function deleteMedia(id: string, url: string) {
  // Delete file from storage
  const filePath = url.split('/').pop();
  if (filePath) {
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([`gallery/${filePath}`]);

    if (storageError) {
      console.error('Error deleting file from storage:', storageError);
      throw storageError;
    }
  }

  // Delete database entry
  const { error } = await supabase
    .from('media')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting media entry:', error);
    throw error;
  }
}