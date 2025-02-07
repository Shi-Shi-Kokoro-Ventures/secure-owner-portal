
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
import { MaintenanceStatusBadge } from "@/components/maintenance/MaintenanceStatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type StatusFilter = MaintenanceStatus | "all";
type SortOrder = "desc" | "asc";

const TenantMaintenance = () => {
  const navigate = useNavigate();
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

  const handleNewRequest = () => {
    navigate('/tenant/maintenance/new');
  };

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
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
          <p className="text-muted-foreground">
            View and manage your maintenance requests
          </p>
        </div>
        <Button onClick={handleNewRequest}>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="flex justify-end gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium">
            Filter by status:
          </label>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
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
          <label htmlFor="sort-order" className="text-sm font-medium">
            Sort by date:
          </label>
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value as SortOrder)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest first</SelectItem>
              <SelectItem value="asc">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                </TableRow>
              ))
            ) : requests && requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>
                    <MaintenanceStatusBadge status={request.status} />
                  </TableCell>
                  <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(request.last_updated_at).toLocaleDateString()}</TableCell>
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
                <TableCell colSpan={5} className="text-center py-4">
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
