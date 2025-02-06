import { UnitStatus } from './enums';

export interface Property {
  id: string;
  owner_id: string | null;
  property_name: string;
  address: string;
  unit_count: number;
  created_at: string;
}

export interface Unit {
  id: string;
  property_id: string | null;
  unit_number: string;
  tenant_id: string | null;
  rent_amount: number;
  status: UnitStatus;
  created_at: string;
}