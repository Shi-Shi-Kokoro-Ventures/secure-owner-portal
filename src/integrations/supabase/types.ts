export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          created_at: string
          id: string
          state: string
          street_address: string
          user_id: string | null
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          state: string
          street_address: string
          user_id?: string | null
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          state?: string
          street_address?: string
          user_id?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          id: string
          new_data: Json | null
          old_data: Json | null
          operation: string
          record_id: string | null
          table_name: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          record_id?: string | null
          table_name: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          record_id?: string | null
          table_name?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_form_submissions: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          property_count: number | null
          status: Database["public"]["Enums"]["contact_form_status"] | null
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          property_count?: number | null
          status?: Database["public"]["Enums"]["contact_form_status"] | null
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          property_count?: number | null
          status?: Database["public"]["Enums"]["contact_form_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message: string | null
          last_message_at: string
          property_id: string | null
          type: Database["public"]["Enums"]["conversation_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          last_message?: string | null
          last_message_at?: string
          property_id?: string | null
          type: Database["public"]["Enums"]["conversation_type"]
        }
        Update: {
          created_at?: string
          id?: string
          last_message?: string | null
          last_message_at?: string
          property_id?: string | null
          type?: Database["public"]["Enums"]["conversation_type"]
        }
        Relationships: [
          {
            foreignKeyName: "conversations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      evictions: {
        Row: {
          court_date: string | null
          created_at: string
          id: string
          lease_id: string | null
          reason: string
          status: Database["public"]["Enums"]["eviction_status"]
          tenant_id: string | null
        }
        Insert: {
          court_date?: string | null
          created_at?: string
          id?: string
          lease_id?: string | null
          reason: string
          status?: Database["public"]["Enums"]["eviction_status"]
          tenant_id?: string | null
        }
        Update: {
          court_date?: string | null
          created_at?: string
          id?: string
          lease_id?: string | null
          reason?: string
          status?: Database["public"]["Enums"]["eviction_status"]
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evictions_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "leases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evictions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lease_addendums: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          document_url: string | null
          effective_date: string
          id: string
          lease_id: string | null
          status: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          document_url?: string | null
          effective_date: string
          id?: string
          lease_id?: string | null
          status?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          document_url?: string | null
          effective_date?: string
          id?: string
          lease_id?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lease_addendums_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lease_addendums_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "leases"
            referencedColumns: ["id"]
          },
        ]
      }
      lease_history: {
        Row: {
          changes: Json
          id: string
          lease_id: string | null
          modified_at: string | null
          modified_by: string | null
        }
        Insert: {
          changes: Json
          id?: string
          lease_id?: string | null
          modified_at?: string | null
          modified_by?: string | null
        }
        Update: {
          changes?: Json
          id?: string
          lease_id?: string | null
          modified_at?: string | null
          modified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lease_history_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "leases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lease_history_modified_by_fkey"
            columns: ["modified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lease_renewals: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          id: string
          lease_id: string | null
          new_end_date: string
          new_monthly_rent: number
          notes: string | null
          previous_end_date: string
          status: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          lease_id?: string | null
          new_end_date: string
          new_monthly_rent: number
          notes?: string | null
          previous_end_date: string
          status?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          lease_id?: string | null
          new_end_date?: string
          new_monthly_rent?: number
          notes?: string | null
          previous_end_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lease_renewals_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lease_renewals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lease_renewals_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "leases"
            referencedColumns: ["id"]
          },
        ]
      }
      leases: {
        Row: {
          auto_renewal: boolean | null
          created_at: string
          deposit_amount: number
          documents: string[] | null
          end_date: string
          id: string
          last_modified_at: string | null
          last_modified_by: string | null
          late_fee_grace_period_days: number | null
          late_fee_percentage: number | null
          lease_number: string
          lease_type: string
          monthly_rent: number
          notice_period_days: number | null
          rent_due_day: number | null
          security_deposit_status: string
          special_terms: string | null
          start_date: string
          status: Database["public"]["Enums"]["lease_status"]
          tenant_id: string
          unit_id: string
          utilities_included: string[] | null
        }
        Insert: {
          auto_renewal?: boolean | null
          created_at?: string
          deposit_amount: number
          documents?: string[] | null
          end_date: string
          id?: string
          last_modified_at?: string | null
          last_modified_by?: string | null
          late_fee_grace_period_days?: number | null
          late_fee_percentage?: number | null
          lease_number: string
          lease_type?: string
          monthly_rent: number
          notice_period_days?: number | null
          rent_due_day?: number | null
          security_deposit_status?: string
          special_terms?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["lease_status"]
          tenant_id: string
          unit_id: string
          utilities_included?: string[] | null
        }
        Update: {
          auto_renewal?: boolean | null
          created_at?: string
          deposit_amount?: number
          documents?: string[] | null
          end_date?: string
          id?: string
          last_modified_at?: string | null
          last_modified_by?: string | null
          late_fee_grace_period_days?: number | null
          late_fee_percentage?: number | null
          lease_number?: string
          lease_type?: string
          monthly_rent?: number
          notice_period_days?: number | null
          rent_due_day?: number | null
          security_deposit_status?: string
          special_terms?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["lease_status"]
          tenant_id?: string
          unit_id?: string
          utilities_included?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "leases_last_modified_by_fkey"
            columns: ["last_modified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leases_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leases_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          assigned_vendor: string | null
          created_at: string
          description: string
          id: string
          status: Database["public"]["Enums"]["maintenance_status"]
          tenant_id: string | null
          unit_id: string | null
        }
        Insert: {
          assigned_vendor?: string | null
          created_at?: string
          description: string
          id?: string
          status?: Database["public"]["Enums"]["maintenance_status"]
          tenant_id?: string | null
          unit_id?: string | null
        }
        Update: {
          assigned_vendor?: string | null
          created_at?: string
          description?: string
          id?: string
          status?: Database["public"]["Enums"]["maintenance_status"]
          tenant_id?: string | null
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_assigned_vendor_fkey"
            columns: ["assigned_vendor"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          message_content: string
          message_type: Database["public"]["Enums"]["message_type"]
          receiver_id: string | null
          sender_id: string
          status: Database["public"]["Enums"]["message_status"]
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          message_content: string
          message_type?: Database["public"]["Enums"]["message_type"]
          receiver_id?: string | null
          sender_id: string
          status?: Database["public"]["Enums"]["message_status"]
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          message_content?: string
          message_type?: Database["public"]["Enums"]["message_type"]
          receiver_id?: string | null
          sender_id?: string
          status?: Database["public"]["Enums"]["message_status"]
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          card_brand: string
          card_last4: string
          created_at: string
          id: string
          is_active: boolean | null
          is_default: boolean | null
          stripe_payment_method_id: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          card_brand: string
          card_last4: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          stripe_payment_method_id: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          card_brand?: string
          card_last4?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          stripe_payment_method_id?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_paid: number
          connected_account_id: string | null
          created_at: string
          id: string
          lease_id: string | null
          method: Database["public"]["Enums"]["payment_method"]
          payment_date: string
          payment_method_id: string | null
          platform_fee_amount: number | null
          status: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id: string | null
          stripe_transfer_id: string | null
          tenant_id: string | null
        }
        Insert: {
          amount_paid: number
          connected_account_id?: string | null
          created_at?: string
          id?: string
          lease_id?: string | null
          method: Database["public"]["Enums"]["payment_method"]
          payment_date: string
          payment_method_id?: string | null
          platform_fee_amount?: number | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
          tenant_id?: string | null
        }
        Update: {
          amount_paid?: number
          connected_account_id?: string | null
          created_at?: string
          id?: string
          lease_id?: string | null
          method?: Database["public"]["Enums"]["payment_method"]
          payment_date?: string
          payment_method_id?: string | null
          platform_fee_amount?: number | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "leases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string
          created_at: string
          id: string
          owner_id: string | null
          property_name: string
          unit_count: number
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          owner_id?: string | null
          property_name: string
          unit_count: number
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          owner_id?: string | null
          property_name?: string
          unit_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_redemptions: {
        Row: {
          created_at: string
          id: string
          points_used: number
          reward_item: string
          tenant_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          points_used: number
          reward_item: string
          tenant_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          points_used?: number
          reward_item?: string
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reward_redemptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_connect_accounts: {
        Row: {
          created_at: string
          id: string
          onboarding_status: string | null
          stripe_account_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          onboarding_status?: string | null
          stripe_account_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          onboarding_status?: string | null
          stripe_account_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_connect_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_customers: {
        Row: {
          created_at: string
          id: string
          stripe_customer_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          stripe_customer_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          stripe_customer_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_announcements: {
        Row: {
          audience: Database["public"]["Enums"]["announcement_audience"] | null
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          is_pinned: boolean | null
          is_scheduled: boolean | null
          message: string
          scheduled_time: string | null
          title: string
          urgency_level:
            | Database["public"]["Enums"]["announcement_urgency"]
            | null
        }
        Insert: {
          audience?: Database["public"]["Enums"]["announcement_audience"] | null
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_pinned?: boolean | null
          is_scheduled?: boolean | null
          message: string
          scheduled_time?: string | null
          title: string
          urgency_level?:
            | Database["public"]["Enums"]["announcement_urgency"]
            | null
        }
        Update: {
          audience?: Database["public"]["Enums"]["announcement_audience"] | null
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_pinned?: boolean | null
          is_scheduled?: boolean | null
          message?: string
          scheduled_time?: string | null
          title?: string
          urgency_level?:
            | Database["public"]["Enums"]["announcement_urgency"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "system_announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_rewards: {
        Row: {
          id: string
          last_updated: string
          points: number
          tenant_id: string | null
        }
        Insert: {
          id?: string
          last_updated?: string
          points?: number
          tenant_id?: string | null
        }
        Update: {
          id?: string
          last_updated?: string
          points?: number
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_rewards_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      theme_settings: {
        Row: {
          accent_color: string
          animation_speed: string | null
          background_color: string
          border_radius: string | null
          created_at: string
          dark_mode_enabled: boolean | null
          font_size_base: string | null
          id: string
          primary_color: string
          secondary_color: string
          spacing_unit: string | null
          text_color: string
          updated_at: string
        }
        Insert: {
          accent_color?: string
          animation_speed?: string | null
          background_color?: string
          border_radius?: string | null
          created_at?: string
          dark_mode_enabled?: boolean | null
          font_size_base?: string | null
          id?: string
          primary_color?: string
          secondary_color?: string
          spacing_unit?: string | null
          text_color?: string
          updated_at?: string
        }
        Update: {
          accent_color?: string
          animation_speed?: string | null
          background_color?: string
          border_radius?: string | null
          created_at?: string
          dark_mode_enabled?: boolean | null
          font_size_base?: string | null
          id?: string
          primary_color?: string
          secondary_color?: string
          spacing_unit?: string | null
          text_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          created_at: string
          id: string
          property_id: string | null
          rent_amount: number
          status: Database["public"]["Enums"]["unit_status"]
          tenant_id: string | null
          unit_number: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id?: string | null
          rent_amount: number
          status?: Database["public"]["Enums"]["unit_status"]
          tenant_id?: string | null
          unit_number: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string | null
          rent_amount?: number
          status?: Database["public"]["Enums"]["unit_status"]
          tenant_id?: string | null
          unit_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_documents: {
        Row: {
          created_at: string
          document_type: string
          file_url: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_type: string
          file_url: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string
          file_url?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          profile_picture_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          ssn_last_four: string | null
          status: Database["public"]["Enums"]["user_status"]
          temporary_password: string | null
          two_factor_enabled: boolean
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          profile_picture_url?: string | null
          role: Database["public"]["Enums"]["user_role"]
          ssn_last_four?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          temporary_password?: string | null
          two_factor_enabled?: boolean
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          profile_picture_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          ssn_last_four?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          temporary_password?: string | null
          two_factor_enabled?: boolean
        }
        Relationships: []
      }
      vendor_details: {
        Row: {
          company_name: string
          created_at: string
          id: string
          user_id: string | null
          vendor_type: Database["public"]["Enums"]["vendor_type"]
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          user_id?: string | null
          vendor_type: Database["public"]["Enums"]["vendor_type"]
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          user_id?: string | null
          vendor_type?: Database["public"]["Enums"]["vendor_type"]
        }
        Relationships: [
          {
            foreignKeyName: "vendor_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          company_name: string
          contact_name: string
          created_at: string
          email: string
          id: string
          phone: string
          services_offered: string | null
        }
        Insert: {
          company_name: string
          contact_name: string
          created_at?: string
          email: string
          id?: string
          phone: string
          services_offered?: string | null
        }
        Update: {
          company_name?: string
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          phone?: string
          services_offered?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          email: string
          status: Database["public"]["Enums"]["subscription_status"]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          status?: Database["public"]["Enums"]["subscription_status"]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_late_fees: {
        Args: {
          p_tenant_id: string
        }
        Returns: undefined
      }
      approve_maintenance: {
        Args: {
          p_request_id: string
          p_vendor_id: string
        }
        Returns: undefined
      }
      collect_rent: {
        Args: {
          p_tenant_id: string
          p_amount: number
        }
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_property_manager: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      redeem_rewards: {
        Args: {
          p_tenant_id: string
          p_points: number
          p_reward_item: string
        }
        Returns: undefined
      }
      update_tenant_rewards: {
        Args: {
          p_tenant_id: string
          p_points: number
        }
        Returns: undefined
      }
    }
    Enums: {
      announcement_audience:
        | "all"
        | "tenants"
        | "owners"
        | "property_managers"
        | "admins"
      announcement_urgency: "low" | "medium" | "high" | "critical"
      contact_form_status: "pending" | "in_progress" | "completed"
      conversation_type:
        | "tenant-manager"
        | "tenant-owner"
        | "owner-manager"
        | "maintenance-vendor"
        | "group"
      eviction_status: "initiated" | "court_pending" | "completed" | "dismissed"
      lease_status: "active" | "terminated" | "pending"
      lease_type_enum: "fixed" | "month-to-month" | "short-term"
      maintenance_status: "pending" | "in_progress" | "completed"
      message_status: "sent" | "delivered" | "read"
      message_type: "text" | "image" | "video" | "file"
      payment_method: "ACH" | "credit_card" | "Zelle" | "PayPal"
      payment_status: "pending" | "completed" | "failed"
      security_deposit_status_enum: "pending" | "received" | "returned"
      unit_status: "vacant" | "occupied" | "under_maintenance"
      user_role: "tenant" | "property_manager" | "owner" | "admin" | "vendor"
      user_status: "active" | "pending_approval" | "suspended" | "archived"
      vendor_type:
        | "plumbing"
        | "electrical"
        | "cleaning"
        | "general_maintenance"
        | "hvac"
        | "landscaping"
        | "pest_control"
        | "security"
      subscription_status: "active" | "unsubscribed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
