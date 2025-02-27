export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

export interface AdminState {
  isAuthenticated: boolean;
  user: AdminUser | null;
}