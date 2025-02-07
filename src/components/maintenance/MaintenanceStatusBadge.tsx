
import { Badge } from "@/components/ui/badge";
import { MaintenanceStatus } from "@/integrations/supabase/types/enums";
import { Clock, CheckCircle2, Activity } from "lucide-react";

interface MaintenanceStatusBadgeProps {
  status: MaintenanceStatus;
}

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    variant: "default" as const,
    icon: Activity,
  },
  completed: {
    label: "Completed",
    variant: "default" as const,
    icon: CheckCircle2,
  },
};

export const MaintenanceStatusBadge = ({ status }: MaintenanceStatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};
