
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MaintenanceRequest } from "@/integrations/supabase/types/maintenance";
import { MaintenanceStatusBadge } from "./MaintenanceStatusBadge";
import { Skeleton } from "@/components/ui/skeleton";

interface MaintenanceTableProps {
  requests: MaintenanceRequest[] | undefined;
  isLoading: boolean;
}

export const MaintenanceTable = ({ requests, isLoading }: MaintenanceTableProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="font-semibold">Last Updated</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="font-semibold">Title</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold">Created</TableHead>
          <TableHead className="font-semibold">Last Updated</TableHead>
          <TableHead className="font-semibold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <TableCell className="font-medium">{request.title}</TableCell>
              <TableCell>
                <MaintenanceStatusBadge status={request.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(request.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(request.last_updated_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/tenant/maintenance/${request.id}`)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              No maintenance requests found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
