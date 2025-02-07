
import { UnitStatus } from './enums';

export interface Property {
  id: string;
  owner_id: string | null;
  property_name: string;
  address: string;
  unit_count: number;
  created_at: string;
  property_type: string | null;
  year_built: number | null;
  square_footage: number | null;
  amenities: string[] | null;
  parking_spots: number | null;
  description: string | null;
  maintenance_contact: string | null;
  last_inspection_date: string | null;
  insurance_info: any | null;
  property_image_url: string | null;
  status: string;
  total_revenue: number;
  expenses_ytd: number;
  last_modified_at: string;
  last_modified_by: string | null;
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
