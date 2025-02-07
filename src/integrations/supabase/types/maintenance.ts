
import { MaintenanceStatus } from './enums';

export type MaintenanceRequestPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface MaintenanceRequest {
  id: string;
  unit_id: string | null;
  tenant_id: string | null;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenanceRequestPriority;
  assigned_vendor: string | null;
  created_at: string;
  last_updated_at: string;
  preferred_appointment_times?: Record<string, any>;
  technician_notes?: string;
}

export interface MaintenanceRequestUpdate {
  id: string;
  request_id: string;
  update_type: 'status_change' | 'note_added' | 'appointment_scheduled' | 'other';
  update_content: string;
  updated_by: string;
  created_at: string;
}
