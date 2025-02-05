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

interface TenantsTableProps {
  onAddTenant: () => void;
}

export const TenantsTable = ({ onAddTenant }: TenantsTableProps) => {
  const { toast } = useToast();

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
          <Input placeholder="Search tenants..." className="pl-9" />
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
            <TableRow>
              <TableCell className="font-medium">John Smith</TableCell>
              <TableCell>Oakwood Apartments</TableCell>
              <TableCell>101</TableCell>
              <TableCell>john.smith@email.com</TableCell>
              <TableCell>(555) 123-4567</TableCell>
              <TableCell>01/01/2024</TableCell>
              <TableCell>12/31/2024</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                  Active
                </span>
              </TableCell>
            </TableRow>
            {/* Add more sample rows as needed */}
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
          Showing 1-10 of 100 tenants
        </div>
      </div>
    </div>
  );
};