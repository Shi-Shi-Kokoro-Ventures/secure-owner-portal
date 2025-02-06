import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Lease } from "@/types/lease";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dispatch, SetStateAction } from "react";
import { LeaseTableHeader } from "./LeaseTableHeader";
import { LeaseTableRow } from "./LeaseTableRow";

interface LeasesTableProps {
  leases: Lease[];
  isLoading: boolean;
  onLeaseSelect?: Dispatch<SetStateAction<string | null>>;
}

export const LeasesTable = ({ leases, isLoading, onLeaseSelect }: LeasesTableProps) => {
  const { toast } = useToast();

  const { data: userRole } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      
      return data?.role;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isAdmin = userRole === 'admin';
  const isPropertyManager = userRole === 'property_manager';

  return (
    <div className="rounded-md border animate-in fade-in duration-500">
      <div className="p-4 bg-muted/50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Active Leases</h3>
          {(isAdmin || isPropertyManager) && (
            <Button
              onClick={() => toast({
                title: "Create Lease",
                description: "New lease creation will be available in the next update.",
              })}
              size="sm"
            >
              Create Lease
            </Button>
          )}
        </div>
      </div>
      <Table>
        <LeaseTableHeader showActions={isAdmin || isPropertyManager} />
        <TableBody>
          {leases?.map((lease) => (
            <LeaseTableRow
              key={lease.id}
              lease={lease}
              isAdmin={isAdmin}
              isPropertyManager={isPropertyManager}
              onLeaseSelect={onLeaseSelect}
            />
          ))}
          {leases?.length === 0 && (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center text-muted-foreground">
                No leases found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};