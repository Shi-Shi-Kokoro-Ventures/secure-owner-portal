export * from './base';
export * from './enums';
export * from './user';
export * from './property';
export * from './lease';
export * from './payment';
export * from './maintenance';
export * from './communication';
export * from './settings';
export * from './newsletter';

import { Database as BaseDatabase } from './base';
import { User, UserDocument, EmergencyContact } from './user';
import { Property, Unit } from './property';
import { Lease } from './lease';
import { Payment } from './payment';
import { MaintenanceRequest } from './maintenance';
import { SystemAnnouncement, Conversation, Message } from './communication';
import { AdminSetting, ThemeSetting } from './settings';
import { Newsletter, NewsletterSubscriber } from './newsletter';

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
      newsletters: {
        Row: Newsletter;
        Insert: Partial<Newsletter>;
        Update: Partial<Newsletter>;
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: Partial<NewsletterSubscriber>;
        Update: Partial<NewsletterSubscriber>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in string]: any;
    };
    Enums: {
      [_ in string]: any;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}