
export type UnitStatus = 'vacant' | 'occupied' | 'under_maintenance';

export interface Property {
  id: string;
  owner_id?: string;
  property_name: string;
  address: string;
  unit_count: number;
  created_at: string;
  property_type?: string;
  year_built?: number;
  square_footage?: number;
  amenities?: string[];
  parking_spots?: number;
  description?: string;
  maintenance_contact?: string;
  last_inspection_date?: string;
  insurance_info?: any;
  property_image_url?: string;
  status: string;
  total_revenue: number;
  expenses_ytd: number;
  last_modified_at: string;
  last_modified_by?: string;
  bedrooms?: number;
  bathrooms?: number;
  virtual_tour_url?: string;
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
