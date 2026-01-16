export interface Category {
  _id: string;
  name: string;
  description?: string;
  images?: string[];
  parent?: string | null;
  shop?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_deleted: boolean;
}

