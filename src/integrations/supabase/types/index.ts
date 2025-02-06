export * from './base';
export * from './enums';
export * from './user';
export * from './property';
export * from './lease';
export * from './payment';
export * from './maintenance';
export * from './communication';
export * from './settings';

// Re-export the Database type with all tables
import { Database as BaseDatabase } from './base';
import { User, UserDocument, EmergencyContact } from './user';
import { Property, Unit } from './property';
import { Lease } from './lease';
import { Payment, PaymentMethod } from './payment';
import { MaintenanceRequest } from './maintenance';
import { SystemAnnouncement, Conversation, Message } from './communication';
import { AdminSetting, ThemeSetting } from './settings';

export interface Database extends BaseDatabase {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Partial<User>;
        Update: Partial<User>;
      };
      user_documents: {
        Row: UserDocument;
        Insert: Partial<UserDocument>;
        Update: Partial<UserDocument>;
      };
      emergency_contacts: {
        Row: EmergencyContact;
        Insert: Partial<EmergencyContact>;
        Update: Partial<EmergencyContact>;
      };
      properties: {
        Row: Property;
        Insert: Partial<Property>;
        Update: Partial<Property>;
      };
      units: {
        Row: Unit;
        Insert: Partial<Unit>;
        Update: Partial<Unit>;
      };
      leases: {
        Row: Lease;
        Insert: Partial<Lease>;
        Update: Partial<Lease>;
      };
      payments: {
        Row: Payment;
        Insert: Partial<Payment>;
        Update: Partial<Payment>;
      };
      payment_methods: {
        Row: PaymentMethod;
        Insert: Partial<PaymentMethod>;
        Update: Partial<PaymentMethod>;
      };
      maintenance_requests: {
        Row: MaintenanceRequest;
        Insert: Partial<MaintenanceRequest>;
        Update: Partial<MaintenanceRequest>;
      };
      system_announcements: {
        Row: SystemAnnouncement;
        Insert: Partial<SystemAnnouncement>;
        Update: Partial<SystemAnnouncement>;
      };
      conversations: {
        Row: Conversation;
        Insert: Partial<Conversation>;
        Update: Partial<Conversation>;
      };
      messages: {
        Row: Message;
        Insert: Partial<Message>;
        Update: Partial<Message>;
      };
      admin_settings: {
        Row: AdminSetting;
        Insert: Partial<AdminSetting>;
        Update: Partial<AdminSetting>;
      };
      theme_settings: {
        Row: ThemeSetting;
        Insert: Partial<ThemeSetting>;
        Update: Partial<ThemeSetting>;
      };
    };
  };
}