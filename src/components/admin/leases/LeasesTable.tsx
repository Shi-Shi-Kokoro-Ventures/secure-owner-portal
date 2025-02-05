
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lease #</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Tenant</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Monthly Rent</TableHead>
          <TableHead>Security Deposit</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leases?.map((lease) => (
          <TableRow key={lease.id}>
            <TableCell className="font-medium">{lease.lease_number}</TableCell>
            <TableCell>{lease.unit.property.property_name}</TableCell>
            <TableCell>{lease.unit.unit_number}</TableCell>
            <TableCell>{`${lease.tenant.first_name} ${lease.tenant.last_name}`}</TableCell>
            <TableCell className="capitalize">{lease.lease_type.replace('-', ' ')}</TableCell>
            <TableCell>{new Date(lease.start_date).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(lease.end_date).toLocaleDateString()}</TableCell>
            <TableCell>${lease.monthly_rent.toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <span>${lease.deposit_amount.toLocaleString()}</span>
                {getSecurityDepositBadge(lease.security_deposit_status)}
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(lease.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
