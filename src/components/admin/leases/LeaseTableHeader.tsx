import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaseTableHeaderProps {
  showActions: boolean;
}

export const LeaseTableHeader = ({ showActions }: LeaseTableHeaderProps) => {
  return (
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
        {showActions && <TableHead>Actions</TableHead>}
      </TableRow>
    </TableHeader>
  );
};