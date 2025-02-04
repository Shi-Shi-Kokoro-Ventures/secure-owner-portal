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
import {
  Archive,
  ArchiveRestore,
  Download,
  Filter,
  Printer,
  Search,
} from "lucide-react";
import { useState } from "react";

interface ArchivedOwner {
  id: string;
  name: string;
  archivedDate: string;
  reason: string;
  properties: number;
}

const mockArchivedOwners: ArchivedOwner[] = [
  {
    id: "1",
    name: "John Smith",
    archivedDate: "2024-02-15",
    reason: "Account Inactive",
    properties: 3,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    archivedDate: "2024-02-10",
    reason: "Owner Request",
    properties: 2,
  },
  {
    id: "3",
    name: "Michael Brown",
    archivedDate: "2024-02-01",
    reason: "Properties Sold",
    properties: 1,
  },
];

const OwnerArchives = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOwners = mockArchivedOwners.filter((owner) =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Owner Archives</h1>
          <p className="text-muted-foreground">
            View and manage archived owner records
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            </div>
          </div>

          {/* Archives Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Owner Name</TableHead>
                  <TableHead>Archive Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOwners.map((owner) => (
                  <TableRow key={owner.id}>
                    <TableCell className="font-medium">{owner.name}</TableCell>
                    <TableCell>{owner.archivedDate}</TableCell>
                    <TableCell>{owner.reason}</TableCell>
                    <TableCell>{owner.properties}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ArchiveRestore className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Archive Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Total Archived</h3>
              <p className="text-2xl font-bold">{mockArchivedOwners.length}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Properties Affected</h3>
              <p className="text-2xl font-bold">
                {mockArchivedOwners.reduce((acc, owner) => acc + owner.properties, 0)}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Recent Archives</h3>
              <p className="text-2xl font-bold">
                {
                  mockArchivedOwners.filter(
                    (owner) =>
                      new Date(owner.archivedDate) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerArchives;