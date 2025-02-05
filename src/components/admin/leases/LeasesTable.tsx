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

interface LeasesTableProps {
  leases: Lease[];
  isLoading: boolean;
}

export const LeasesTable = ({ leases, isLoading }: LeasesTableProps) => {
  const getStatusBadge = (status: Lease['status']) => {
    const variants = {
      active: <Badge className="bg-green-500">Active</Badge>,
      terminated: <Badge variant="destructive">Terminated</Badge>,
      pending: <Badge variant="secondary">Pending</Badge>,
    };
    return variants[status];
  };

  const getSecurityDepositBadge = (status: Lease['security_deposit_status']) => {
    const variants = {
      pending: <Badge variant="secondary">Pending</Badge>,
      received: <Badge className="bg-green-500">Received</Badge>,
      returned: <Badge variant="destructive">Returned</Badge>,
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
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
            <TableRow key={lease.id} className="hover:bg-muted/50 cursor-pointer">
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
              <TableCell>${lease.monthly_rent.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span>${lease.deposit_amount.toLocaleString()}</span>
                  {getSecurityDepositBadge(lease.security_deposit_status)}
                </div>
              </TableCell>
              <TableCell>
                {lease.auto_renewal ? (
                  <Badge variant="outline" className="bg-blue-50">Yes</Badge>
                ) : (
                  <Badge variant="outline">No</Badge>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(lease.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};