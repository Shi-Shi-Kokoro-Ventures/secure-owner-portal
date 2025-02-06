import { MaintenanceStatus } from './enums';

export interface MaintenanceRequest {
  id: string;
  unit_id: string | null;
  tenant_id: string | null;
  description: string;
  status: MaintenanceStatus;
  assigned_vendor: string | null;
  created_at: string;
}