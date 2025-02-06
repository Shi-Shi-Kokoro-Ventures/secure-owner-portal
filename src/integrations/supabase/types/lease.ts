import { LeaseStatus, SecurityDepositStatusEnum } from './enums';

export interface Lease {
  id: string;
  tenant_id: string;
  unit_id: string;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  deposit_amount: number;
  status: LeaseStatus;
  created_at: string;
  lease_type: string;
  lease_number: string;
  notice_period_days: number | null;
  auto_renewal: boolean | null;
  last_modified_at: string | null;
  last_modified_by: string | null;
  rent_due_day: number | null;
  late_fee_percentage: number | null;
  late_fee_grace_period_days: number | null;
  utilities_included: string[] | null;
  special_terms: string | null;
  security_deposit_status: string;
  documents: string[] | null;
}