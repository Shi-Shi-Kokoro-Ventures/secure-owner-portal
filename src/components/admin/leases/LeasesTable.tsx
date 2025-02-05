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
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LeasesTableProps {
  leases: Lease[];
  isLoading: boolean;
}

export const LeasesTable = ({ leases, isLoading }: LeasesTableProps) => {
  const { toast } = useToast();

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

  const handleRowClick = (leaseId: string) => {
    toast({
      title: "Lease Details",
      description: "Detailed lease view will be available in the next update.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="rounded-md border animate-in fade-in duration-500">
      <div className="p-4 bg-muted/50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Active Leases</h3>
          <Button
            onClick={() => toast({
              title: "Create Lease",
              description: "New lease creation will be available in the next update.",
            })}
            size="sm"
          >
            Create Lease
          </Button>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {leases?.map((lease) => (
            <TableRow 
              key={lease.id} 
              className="hover:bg-muted/50 cursor-pointer transition-colors duration-200"
              onClick={() => handleRowClick(lease.id)}
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
            </TableRow>
          ))}
          {leases?.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                No leases found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};