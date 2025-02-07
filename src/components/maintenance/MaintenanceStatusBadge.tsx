
import { Badge } from "@/components/ui/badge";
import { MaintenanceStatus } from "@/integrations/supabase/types/enums";
import { Clock, CheckCircle2, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaintenanceStatusBadgeProps {
  status: MaintenanceStatus;
}

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: Clock,
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  in_progress: {
    label: "In Progress",
    variant: "default" as const,
    icon: Activity,
    className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  completed: {
    label: "Completed",
    variant: "default" as const,
    icon: CheckCircle2,
    className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
  },
};

export const MaintenanceStatusBadge = ({ status }: MaintenanceStatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={cn("flex items-center gap-1 font-medium transition-colors", config.className)}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};
