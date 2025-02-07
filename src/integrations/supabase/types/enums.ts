
export type AnnouncementAudience = 'all' | 'tenants' | 'owners' | 'property_managers' | 'admins';
export type AnnouncementUrgency = 'low' | 'medium' | 'high' | 'critical';
export type ContactFormStatus = 'pending' | 'in_progress' | 'completed';
export type ConversationType = 'tenant-manager' | 'tenant-owner' | 'owner-manager' | 'maintenance-vendor' | 'group';
export type EvictionStatus = 'initiated' | 'court_pending' | 'completed' | 'dismissed';
export type LeaseStatus = 'active' | 'terminated' | 'pending';
export type LeaseTypeEnum = 'fixed' | 'month-to-month' | 'short-term';
export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'unread';
export type MessageType = 'text' | 'image' | 'video' | 'file';
export type SecurityDepositStatusEnum = 'pending' | 'received' | 'returned';
export type UnitStatus = 'vacant' | 'occupied' | 'under_maintenance';
export type UserRole = 'tenant' | 'property_manager' | 'owner' | 'admin' | 'vendor' | 'special_admin';
export type UserStatus = 'active' | 'pending_approval' | 'suspended' | 'archived';
export type VendorType = 'plumbing' | 'electrical' | 'cleaning' | 'general_maintenance' | 'hvac' | 'landscaping' | 'pest_control' | 'security';
