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
import { ArrowUpDown } from "lucide-react";

interface Owner {
  id: string;
  name: string;
  email: string;
  properties: number;
  status: string;
}

const mockOwners: Owner[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    properties: 3,
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    properties: 2,
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    properties: 1,
    status: "Pending",
  },
];

type SortConfig = {
  key: keyof Owner | null;
  direction: 'asc' | 'desc';
};

export const OwnersTable = () => {
  const [filterValue, setFilterValue] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof Owner) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredAndSortedOwners = useMemo(() => {
    let result = [...mockOwners];

    // Filter
    if (filterValue) {
      const lowerFilter = filterValue.toLowerCase();
      result = result.filter(
        (owner) =>
          owner.name.toLowerCase().includes(lowerFilter) ||
          owner.email.toLowerCase().includes(lowerFilter) ||
          owner.status.toLowerCase().includes(lowerFilter)
      );
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [mockOwners, filterValue, sortConfig]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter owners..."
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
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1"
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('email')}
                  className="flex items-center gap-1"
                >
                  Email
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('properties')}
                  className="flex items-center gap-1"
                >
                  Properties
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedOwners.map((owner) => (
              <TableRow key={owner.id}>
                <TableCell className="font-medium">{owner.name}</TableCell>
                <TableCell>{owner.email}</TableCell>
                <TableCell>{owner.properties}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};