import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Filter, UserPlus, Mail, Building, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface TenantsTableProps {
  onAddTenant: () => void;
}

export const TenantsTable = ({ onAddTenant }: TenantsTableProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tenants, isLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          first_name,
          last_name,
          email,
          phone,
          created_at,
          status,
          leases (
            id,
            start_date,
            end_date,
            units (
              id,
              unit_number,
              properties (
                id,
                property_name
              )
            )
          )
        `)
        .eq('role', 'tenant')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tenants:', error);
        toast({
          title: "Error",
          description: "Failed to fetch tenants. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    },
  });

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Filter functionality coming soon",
    });
  };

  const handleEmailSelected = () => {
    toast({
      title: "Email Selected",
      description: "Email functionality coming soon",
    });
  };

  const handleMoveUnits = () => {
    toast({
      title: "Move Units",
      description: "Unit transfer functionality coming soon",
    });
  };

  const handleEndLease = () => {
    toast({
      title: "End Lease",
      description: "Lease termination functionality coming soon",
    });
  };

  const filteredTenants = tenants?.filter(tenant => 
    tenant.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tenants</h1>
          <p className="text-muted-foreground">Manage your tenants</p>
        </div>
        <Button className="gap-2" onClick={onAddTenant}>
          <UserPlus className="h-4 w-4" />
          Add Tenant
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tenants..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={handleFilter}>
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Move In</TableHead>
              <TableHead>Lease End</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  Loading tenants...
                </TableCell>
              </TableRow>
            ) : filteredTenants?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No tenants found
                </TableCell>
              </TableRow>
            ) : (
              filteredTenants?.map((tenant) => {
                const activeLease = tenant.leases?.[0];
                return (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">
                      {tenant.first_name} {tenant.last_name}
                    </TableCell>
                    <TableCell>
                      {activeLease?.units?.properties?.property_name || '-'}
                    </TableCell>
                    <TableCell>{activeLease?.units?.unit_number || '-'}</TableCell>
                    <TableCell>{tenant.email}</TableCell>
                    <TableCell>{tenant.phone || '-'}</TableCell>
                    <TableCell>
                      {activeLease?.start_date ? new Date(activeLease.start_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      {activeLease?.end_date ? new Date(activeLease.end_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        tenant.status === 'active' ? 'bg-green-100 text-green-700' :
                        tenant.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-700' :
                        tenant.status === 'suspended' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {tenant.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2" onClick={handleEmailSelected}>
            <Mail className="h-4 w-4" />
            Email Selected
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleMoveUnits}>
            <Building className="h-4 w-4" />
            Move Units
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleEndLease}>
            <Calendar className="h-4 w-4" />
            End Lease
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {filteredTenants?.length || 0} tenant{filteredTenants?.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};