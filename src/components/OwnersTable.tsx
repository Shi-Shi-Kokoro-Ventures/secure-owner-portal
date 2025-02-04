import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Download,
  Edit,
  Filter,
  Printer,
  Trash,
  UserPlus,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Owner {
  id: string;
  name: string;
  email: string;
  properties: number;
  balance: number;
  lastPayment: string;
  status: string;
}

const mockOwners: Owner[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    properties: 3,
    balance: 5000,
    lastPayment: "2024-02-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    properties: 2,
    balance: 3500,
    lastPayment: "2024-02-10",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    properties: 1,
    balance: -500,
    lastPayment: "2024-01-28",
    status: "Pending",
  },
];

type SortConfig = {
  key: keyof Owner | null;
  direction: "asc" | "desc";
};

export const OwnersTable = () => {
  const [filterValue, setFilterValue] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

  const handleSort = (key: keyof Owner) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAndSortedOwners = useMemo(() => {
    let result = [...mockOwners];

    if (filterValue) {
      const lowerFilter = filterValue.toLowerCase();
      result = result.filter(
        (owner) =>
          owner.name.toLowerCase().includes(lowerFilter) ||
          owner.email.toLowerCase().includes(lowerFilter) ||
          owner.status.toLowerCase().includes(lowerFilter)
      );
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [mockOwners, filterValue, sortConfig]);

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = (owner: Owner) => {
    console.log("Editing owner:", owner);
  };

  const handleDelete = (owner: Owner) => {
    console.log("Deleting owner:", owner);
  };

  const handleAddOwner = () => {
    console.log("Adding new owner...");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button onClick={handleAddOwner} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Owner
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Active Owners</DropdownMenuItem>
              <DropdownMenuItem>Pending Owners</DropdownMenuItem>
              <DropdownMenuItem>All Owners</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <Input
        placeholder="Search owners..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1"
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("email")}
                  className="flex items-center gap-1"
                >
                  Email
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("properties")}
                  className="flex items-center gap-1"
                >
                  Properties
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("balance")}
                  className="flex items-center gap-1"
                >
                  Balance
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("lastPayment")}
                  className="flex items-center gap-1"
                >
                  Last Payment
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedOwners.map((owner) => (
              <TableRow
                key={owner.id}
                className="cursor-pointer"
                onClick={() => setSelectedOwner(owner)}
              >
                <TableCell className="font-medium">{owner.name}</TableCell>
                <TableCell>{owner.email}</TableCell>
                <TableCell>{owner.properties}</TableCell>
                <TableCell>
                  ${owner.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>{new Date(owner.lastPayment).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      owner.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {owner.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(owner);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(owner);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {selectedOwner && (
        <div className="mt-8 p-6 border rounded-lg bg-white">
          <h2 className="text-xl font-bold mb-4">Owner Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p>Name: {selectedOwner.name}</p>
              <p>Email: {selectedOwner.email}</p>
              <p>Status: {selectedOwner.status}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Financial Summary</h3>
              <p>Properties: {selectedOwner.properties}</p>
              <p>Current Balance: ${selectedOwner.balance.toLocaleString()}</p>
              <p>Last Payment: {new Date(selectedOwner.lastPayment).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};