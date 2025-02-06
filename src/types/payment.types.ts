export type PaymentMethod = 'ACH' | 'credit_card' | 'Zelle' | 'PayPal';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Payment {
  id: string;
  tenant_id?: string;
  lease_id?: string;
  amount_paid: number;
  payment_date: string;
  status: PaymentStatus;
  method: PaymentMethod;
  created_at: string;
  stripe_payment_intent_id?: string;
  payment_method_id?: string;
  platform_fee_amount?: number;
  stripe_transfer_id?: string;
  connected_account_id?: string;
}