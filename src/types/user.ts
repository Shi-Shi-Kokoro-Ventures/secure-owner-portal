
export type UserRole = 'admin' | 'property_manager' | 'owner' | 'tenant';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  created_at: string;
  profile_picture_url: string | null;
}

export interface UserFormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: UserRole;
  profile_picture_url?: string | null;
}
