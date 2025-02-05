import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar, Download, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockLeaseRenewals = [
  {
    id: 1,
    tenant: "John Smith",
    property: "The Stacks - Unit 101",
    currentRent: 2000,
    expiryDate: "2024-04-15",
    status: "Pending Review",
    daysUntilExpiry: 30
  },
  {
    id: 2,
    tenant: "Sarah Johnson",
    property: "Oceanview Residences - Unit 204",
    currentRent: 2500,
    expiryDate: "2024-05-01",
    status: "Approved",
    daysUntilExpiry: 45
  },
  {
    id: 3,
    tenant: "Michael Brown",
    property: "Highland Towers - Unit 305",
    currentRent: 1800,
    expiryDate: "2024-03-30",
    status: "Pending Tenant Response",
    daysUntilExpiry: 15
  }
];

const LeaseRenewals = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} functionality coming soon`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Lease Renewals
          </h1>
          <p className="text-muted-foreground">
            Manage and track lease renewal status
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Renewals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Ready for processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Lease Renewals</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search renewals..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleAction("Filter")}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleAction("Export")}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Current Rent</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeaseRenewals.map((renewal) => (
                  <TableRow key={renewal.id}>
                    <TableCell className="font-medium">{renewal.tenant}</TableCell>
                    <TableCell>{renewal.property}</TableCell>
                    <TableCell>${renewal.currentRent}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {renewal.expiryDate}
                        <span className="text-sm text-muted-foreground">
                          ({renewal.daysUntilExpiry} days)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${renewal.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          renewal.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'}`}>
                        {renewal.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAction("View Details")}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaseRenewals;