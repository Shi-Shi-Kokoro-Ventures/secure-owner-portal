
import { Filter, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenanceStatus } from "@/integrations/supabase/types/enums";

interface MaintenanceFiltersProps {
  statusFilter: MaintenanceStatus | "all";
  setStatusFilter: (value: MaintenanceStatus | "all") => void;
  sortOrder: "desc" | "asc";
  setSortOrder: (value: "desc" | "asc") => void;
}

export const MaintenanceFilters = ({
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}: MaintenanceFiltersProps) => {
  return (
    <div className="flex justify-end gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as MaintenanceStatus | "all")}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-950">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as "desc" | "asc")}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-950">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest first</SelectItem>
            <SelectItem value="asc">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
