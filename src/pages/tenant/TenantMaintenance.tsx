import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceRequest } from "@/integrations/supabase/types/maintenance";
import { MaintenanceStatus } from "@/integrations/supabase/types/enums";

type StatusFilter = MaintenanceStatus | "all";

const TenantMaintenance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['maintenanceRequests', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('maintenance_requests')
        .select('*')
        .eq('tenant_id', (await supabase.auth.getUser()).data.user?.id);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error fetching maintenance requests",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data as MaintenanceRequest[];
    },
  });

  const handleNewRequest = () => {
    navigate('/tenant/maintenance/new');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading maintenance requests</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
          <p className="text-muted-foreground">
            View and manage your maintenance requests
          </p>
        </div>
        <Button onClick={handleNewRequest}>
          New Request
        </Button>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium">
            Filter by status:
          </label>
          <select
            id="status-filter"
            className="border rounded-md px-3 py-1 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests && requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    {new Date(request.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/tenant/maintenance/${request.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No maintenance requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantMaintenance;