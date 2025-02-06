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
  status: 'active' | 'terminated' | 'pending';
  lease_type: 'fixed' | 'month-to-month' | 'short-term';
  security_deposit_status: 'pending' | 'received' | 'returned';
  deposit_amount: number;
  auto_renewal: boolean;
  notice_period_days: number;
  rent_due_day: number;
  late_fee_percentage: number;
  late_fee_grace_period_days: number;
  created_at: string;
  last_modified_at: string;
  last_modified_by: string;
  documents: string[];
  utilities_included: string[];
  special_terms: string | null;
}