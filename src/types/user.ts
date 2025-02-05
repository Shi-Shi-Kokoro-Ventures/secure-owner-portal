
export type UserRole = 'admin' | 'property_manager' | 'owner' | 'tenant' | 'vendor';
export type UserStatus = 'active' | 'pending_approval' | 'suspended' | 'archived';
export type VendorType = 'plumbing' | 'electrical' | 'cleaning' | 'general_maintenance' | 'hvac' | 'landscaping' | 'pest_control' | 'security';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  created_at: string;
  profile_picture_url: string | null;
  date_of_birth: string | null;
  ssn_last_four: string | null;
  status: UserStatus;
  two_factor_enabled: boolean;
  temporary_password: string | null;
}

export interface UserFormState {
  // Step 1: Basic Information
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: UserRole;
  
  // Step 2: Legal Information
  date_of_birth: string;
  ssn_last_four: string;
  government_id: File | null;
  
  // Step 3: Address Information
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  
  // Step 4: Role-Specific Information
  company_name: string;
  vendor_type: VendorType | null;
  assigned_properties: string[];
  
  // Step 5: Emergency Contact
  emergency_contact_name: string;
  emergency_contact_phone: string;
  
  // Step 6: Security Settings
  two_factor_enabled: boolean;
  status: UserStatus;
  temporary_password: string;
}
