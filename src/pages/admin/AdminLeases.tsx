
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeaseMetrics } from "@/components/admin/leases/LeaseMetrics";
import { LeasesTable } from "@/components/admin/leases/LeasesTable";
import type { Lease } from "@/types/lease";

const AdminLeases = () => {
  const { toast } = useToast();
  const [isNewLeaseDialogOpen, setIsNewLeaseDialogOpen] = useState(false);

  const { data: leases, isLoading } = useQuery({
    queryKey: ['leases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leases')
        .select(`
          id,
          lease_number,
          tenant:users!leases_tenant_id_fkey(first_name, last_name),
          unit:unit_id(
            unit_number,
            property:property_id(property_name)
          ),
          start_date,
          end_date,
          monthly_rent,
          status,
          lease_type,
          security_deposit_status,
          deposit_amount,
          auto_renewal,
          notice_period_days,
          rent_due_day,
          late_fee_percentage,
          late_fee_grace_period_days
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching leases",
          description: error.message,
        });
        return [];
      }

      return data as Lease[];
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Lease Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all property leases
            </p>
          </div>
          <Button onClick={() => setIsNewLeaseDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Lease
          </Button>
        </div>

        <LeaseMetrics leases={leases || []} />

        <Card>
          <CardHeader>
            <CardTitle>All Leases</CardTitle>
          </CardHeader>
          <CardContent>
            <LeasesTable leases={leases || []} isLoading={isLoading} />
          </CardContent>
        </Card>

        <Dialog open={isNewLeaseDialogOpen} onOpenChange={setIsNewLeaseDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Lease</DialogTitle>
              <DialogDescription>
                This feature will be implemented in the next phase.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminLeases;
