import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Mock data - replace with actual API call
const mockRequests = [
  {
    id: "REQ-001",
    title: "Leaking Faucet",
    dateSubmitted: "2024-02-04",
    category: "Plumbing",
    status: "Open",
    lastUpdated: "2024-02-04",
  },
  {
    id: "REQ-002",
    title: "AC Not Working",
    dateSubmitted: "2024-02-03",
    category: "HVAC",
    status: "In Progress",
    lastUpdated: "2024-02-04",
  },
];

const TenantMaintenance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleNewRequest = () => {
    navigate("/tenant/maintenance/new");
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Filtering functionality coming soon",
    });
  };

  const handleRowClick = (id: string) => {
    navigate(`/tenant/maintenance/${id}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
        <p className="text-muted-foreground">
          View and manage your maintenance requests
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleFilter}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <select
            className="border rounded-md px-3 py-1 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <Button onClick={handleNewRequest}>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Requests Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No maintenance requests found
                </TableCell>
              </TableRow>
            ) : (
              mockRequests.map((request) => (
                <TableRow
                  key={request.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(request.id)}
                >
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.dateSubmitted}</TableCell>
                  <TableCell>{request.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${request.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}
                      ${request.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                    `}>
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell>{request.lastUpdated}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TenantMaintenance;