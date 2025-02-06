export type LeaseStatus = 'active' | 'terminated' | 'pending';
export type LeaseType = 'fixed' | 'month-to-month' | 'short-term';
export type SecurityDepositStatus = 'pending' | 'received' | 'returned';

export interface Lease {
  id: string;
  lease_number: string;
  tenant: {
    first_name: string;
    last_name: string;
  };
  unit: {
    unit_number: string;
    property: {
      property_name: string;
    };
  };
  start_date: string;
  end_date: string;
  monthly_rent: number;
  status: LeaseStatus;
  lease_type: LeaseType;
  security_deposit_status: SecurityDepositStatus;
  deposit_amount: number;
  auto_renewal: boolean;
  notice_period_days: number;
  rent_due_day: number;
  late_fee_percentage: number;
  late_fee_grace_period_days: number;
}