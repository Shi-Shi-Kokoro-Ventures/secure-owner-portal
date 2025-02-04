import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileSignature, Filter, Printer, Search, User } from "lucide-react";

const mockSignatures = [
  {
    id: "1",
    tenant: "John Smith",
    document: "Lease Agreement",
    sentDate: "2024-02-20",
    status: "Signed",
    unit: "101",
  },
  {
    id: "2",
    tenant: "Sarah Johnson",
    document: "Pet Addendum",
    sentDate: "2024-02-19",
    status: "Pending",
    unit: "205",
  },
  {
    id: "3",
    tenant: "Michael Brown",
    document: "Maintenance Agreement",
    sentDate: "2024-02-18",
    status: "Expired",
    unit: "304",
  },
];

const TenantSignatures = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Signatures</h1>
          <p className="text-muted-foreground">
            Manage document signatures for tenants
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Total Requests</span>
            </div>
            <p className="mt-2 text-2xl font-bold">24</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Signed</span>
            </div>
            <p className="mt-2 text-2xl font-bold">18</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <p className="mt-2 text-2xl font-bold">4</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium">Expired</span>
            </div>
            <p className="mt-2 text-2xl font-bold">2</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search signatures..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <FileSignature className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </div>
        </div>

        {/* Signatures Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSignatures.map((signature) => (
                <TableRow key={signature.id}>
                  <TableCell className="font-medium">{signature.tenant}</TableCell>
                  <TableCell>{signature.document}</TableCell>
                  <TableCell>{signature.unit}</TableCell>
                  <TableCell>{signature.sentDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        signature.status === "Signed"
                          ? "bg-green-100 text-green-700"
                          : signature.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {signature.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileSignature className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default TenantSignatures;