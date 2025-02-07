
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceRequest } from "@/integrations/supabase/types/maintenance";
import { MaintenanceStatus } from "@/integrations/supabase/types/enums";
import { MaintenanceHeader } from "@/components/maintenance/MaintenanceHeader";
import { MaintenanceFilters } from "@/components/maintenance/MaintenanceFilters";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

type StatusFilter = MaintenanceStatus | "all";
type SortOrder = "desc" | "asc";

const TenantMaintenance = () => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['maintenanceRequests', statusFilter, sortOrder],
    queryFn: async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        toast({
          title: "Error fetching user information",
          description: userError.message,
          variant: "destructive",
        });
        throw userError;
      }

      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to view maintenance requests",
          variant: "destructive",
        });
        throw new Error("User not authenticated");
      }

      let query = supabase
        .from('maintenance_requests')
        .select('*')
        .eq('tenant_id', user.id)
        .order('created_at', { ascending: sortOrder === 'asc' });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error: requestsError } = await query;

      if (requestsError) {
        toast({
          title: "Error fetching maintenance requests",
          description: requestsError.message,
          variant: "destructive",
        });
        throw requestsError;
      }

      return data as MaintenanceRequest[];
    },
  });

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading maintenance requests. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-6xl">
      <MaintenanceHeader />
      
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <MaintenanceFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          
          <div className="rounded-md border bg-white dark:bg-gray-950">
            <MaintenanceTable 
              requests={requests}
              isLoading={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantMaintenance;
