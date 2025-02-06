import { Database } from './base';

export type PaymentStatus = Database['public']['Enums']['payment_status'];
export type PaymentMethodType = Database['public']['Enums']['payment_method'];

export interface Payment {
  id: string;
  tenant_id: string | null;
  lease_id: string | null;
  amount_paid: number;
  payment_date: string;
  status: PaymentStatus;
  method: PaymentMethodType;
  created_at: string;
  stripe_payment_intent_id: string | null;
  payment_method_id: string | null;
  platform_fee_amount: number | null;
  stripe_transfer_id: string | null;
  connected_account_id: string | null;
}

export interface PaymentMethodInterface {
  id: string;
  tenant_id: string;
  stripe_payment_method_id: string;
  card_last4: string;
  card_brand: string;
  is_default: boolean | null;
  created_at: string;
  updated_at: string;
  is_active: boolean | null;
}