export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      menu_categories: {
        Row: {
          id: string;
          category_name: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_name: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_name?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string;
          item_name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          item_name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          item_name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_item_tags: {
        Row: {
          id: string;
          tag_name: string;
          icon_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tag_name: string;
          icon_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tag_name?: string;
          icon_url?: string | null;
          created_at?: string;
        };
      };
      menu_item_tag_relations: {
        Row: {
          id: string;
          menu_item_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          tag_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          menu_item_id?: string;
          tag_id?: string;
          created_at?: string;
        };
      };
    };
  };
}