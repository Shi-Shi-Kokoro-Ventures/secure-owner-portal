import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Lease } from "@/types/lease";
import { formatDistance } from "date-fns";
import { LeaseStatusBadge } from "./LeaseStatusBadge";
import { LeaseActions } from "./LeaseActions";

interface LeaseTableRowProps {
  lease: Lease;
  isAdmin: boolean;
  isPropertyManager: boolean;
  onLeaseSelect?: (id: string) => void;
}

export const LeaseTableRow = ({ lease, isAdmin, isPropertyManager, onLeaseSelect }: LeaseTableRowProps) => {
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

  return (
    <TableRow className="hover:bg-muted/50 transition-colors duration-200">
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
          <LeaseStatusBadge 
            status={lease.status} 
            type="security_deposit" 
            value={lease.security_deposit_status} 
          />
        </div>
      </TableCell>
      <TableCell>
        {lease.auto_renewal ? (
          <Badge variant="outline" className="bg-blue-50 hover:bg-blue-100">Yes</Badge>
        ) : (
          <Badge variant="outline" className="hover:bg-gray-100">No</Badge>
        )}
      </TableCell>
      <TableCell>
        <LeaseStatusBadge 
          status={lease.status} 
          type="status" 
          value={lease.status} 
        />
      </TableCell>
      {(isAdmin || isPropertyManager) && (
        <TableCell>
          <LeaseActions 
            leaseId={lease.id}
            isAdmin={isAdmin}
            isPropertyManager={isPropertyManager}
            onLeaseSelect={onLeaseSelect}
          />
        </TableCell>
      )}
    </TableRow>
  );
};