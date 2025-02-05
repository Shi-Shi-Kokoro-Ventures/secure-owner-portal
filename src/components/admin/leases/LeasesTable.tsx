import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lease } from "@/types/lease";
import { formatDistance } from "date-fns";
import { Loader2, MoreHorizontal, FileText, UserCheck, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dispatch, SetStateAction } from "react";

interface LeasesTableProps {
  leases: Lease[];
  isLoading: boolean;
  onLeaseSelect?: Dispatch<SetStateAction<string | null>>;
}

export const LeasesTable = ({ leases, isLoading, onLeaseSelect }: LeasesTableProps) => {
  const { toast } = useToast();

  const { data: userRole } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      return data?.role;
    }
  });

  const getStatusBadge = (status: Lease['status']) => {
    const variants = {
      active: <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>,
      terminated: <Badge variant="destructive" className="hover:bg-red-600">Terminated</Badge>,
      pending: <Badge variant="secondary" className="hover:bg-gray-600">Pending</Badge>,
    };
    return variants[status];
  };

  const getSecurityDepositBadge = (status: Lease['security_deposit_status']) => {
    const variants = {
      pending: <Badge variant="secondary" className="hover:bg-gray-600">Pending</Badge>,
      received: <Badge className="bg-emerald-500 hover:bg-emerald-600">Received</Badge>,
      returned: <Badge variant="destructive" className="hover:bg-red-600">Returned</Badge>,
    };
    return variants[status];
  };

  const getLeaseType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    return formatDistance(end, now, { addSuffix: true });
  };

  const handleAction = (action: string, leaseId: string) => {
    if (action === "View Details" && onLeaseSelect) {
      onLeaseSelect(leaseId);
    }
    toast({
      title: action,
      description: `${action} for lease ${leaseId} will be available in the next update.`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isAdmin = userRole === 'admin';
  const isPropertyManager = userRole === 'property_manager';
  const isOwner = userRole === 'owner';

  return (
    <div className="rounded-md border animate-in fade-in duration-500">
      <div className="p-4 bg-muted/50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Active Leases</h3>
          {(isAdmin || isPropertyManager) && (
            <Button
              onClick={() => toast({
                title: "Create Lease",
                description: "New lease creation will be available in the next update.",
              })}
              size="sm"
            >
              Create Lease
            </Button>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Lease #</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Monthly Rent</TableHead>
            <TableHead>Security Deposit</TableHead>
            <TableHead>Auto Renewal</TableHead>
            <TableHead>Status</TableHead>
            {(isAdmin || isPropertyManager) && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leases?.map((lease) => (
            <TableRow 
              key={lease.id} 
              className="hover:bg-muted/50 transition-colors duration-200"
            >
              <TableCell className="font-medium">{lease.lease_number}</TableCell>
              <TableCell>{lease.unit.property.property_name}</TableCell>
              <TableCell>{lease.unit.unit_number}</TableCell>
              <TableCell>{`${lease.tenant.first_name} ${lease.tenant.last_name}`}</TableCell>
              <TableCell className="capitalize">{getLeaseType(lease.lease_type)}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">
                    Ends {getRemainingDays(lease.end_date)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-medium">${lease.monthly_rent.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span>${lease.deposit_amount.toLocaleString()}</span>
                  {getSecurityDepositBadge(lease.security_deposit_status)}
                </div>
              </TableCell>
              <TableCell>
                {lease.auto_renewal ? (
                  <Badge variant="outline" className="bg-blue-50 hover:bg-blue-100">Yes</Badge>
                ) : (
                  <Badge variant="outline" className="hover:bg-gray-100">No</Badge>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(lease.status)}</TableCell>
              {(isAdmin || isPropertyManager) && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Lease Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction("View Details", lease.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem onClick={() => handleAction("Edit Lease", lease.id)}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Edit Lease
                        </DropdownMenuItem>
                      )}
                      {(isAdmin || isPropertyManager) && (
                        <DropdownMenuItem 
                          onClick={() => handleAction("Terminate Lease", lease.id)}
                          className="text-red-600"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Terminate Lease
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
          {leases?.length === 0 && (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center text-muted-foreground">
                No leases found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};