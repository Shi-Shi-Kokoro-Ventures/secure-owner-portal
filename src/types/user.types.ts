export type UserRole = 'tenant' | 'property_manager' | 'owner' | 'admin' | 'vendor';
export type UserStatus = 'active' | 'pending_approval' | 'suspended' | 'archived';

export interface User {
  id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at: string;
  profile_picture_url?: string;
  date_of_birth?: string;
  ssn_last_four?: string;
  status: UserStatus;
  two_factor_enabled: boolean;
  temporary_password?: string;
}