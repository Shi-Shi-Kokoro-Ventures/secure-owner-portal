export type UnitStatus = 'vacant' | 'occupied' | 'under_maintenance';

export interface Property {
  id: string;
  owner_id?: string;
  property_name: string;
  address: string;
  unit_count: number;
  created_at: string;
}

export interface Unit {
  id: string;
  property_id?: string;
  unit_number: string;
  tenant_id?: string;
  rent_amount: number;
  status: UnitStatus;
  created_at: string;
}