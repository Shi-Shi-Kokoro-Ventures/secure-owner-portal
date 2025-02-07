import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TenantsTableProps {
  onAddTenant?: () => void;
}

export const TenantsTable = ({ onAddTenant }: TenantsTableProps) => {
  const { toast } = useToast();

  const { data: tenants, isLoading, error } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          leases!leases_tenant_id_fkey (
            id,
            start_date,
            end_date,
            monthly_rent,
            status
          )
        `)
        .eq('role', 'tenant');

      if (error) {
        toast({
          title: "Error fetching tenants",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tenants</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onAddTenant}>Add Tenant</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants?.map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell>{`${tenant.first_name} ${tenant.last_name}`}</TableCell>
              <TableCell>{tenant.email}</TableCell>
              <TableCell>{tenant.phone || 'N/A'}</TableCell>
              <TableCell>{tenant.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};