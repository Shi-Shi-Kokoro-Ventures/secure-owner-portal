import { Json } from './base';
import { UserRole, UserStatus } from './enums';

export interface User {
  id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  created_at: string;
  profile_picture_url: string | null;
  date_of_birth: string | null;
  ssn_last_four: string | null;
  status: UserStatus;
  two_factor_enabled: boolean;
  temporary_password: string | null;
}

export interface UserDocument {
  id: string;
  user_id: string | null;
  document_type: string;
  file_url: string;
  created_at: string;
}

export interface EmergencyContact {
  id: string;
  user_id: string | null;
  name: string;
  phone: string;
  created_at: string;
}