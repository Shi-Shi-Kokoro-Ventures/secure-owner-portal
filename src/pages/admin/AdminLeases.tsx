import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeaseMetrics } from "@/components/admin/leases/LeaseMetrics";
import { LeasesTable } from "@/components/admin/leases/LeasesTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Lease } from "@/types/lease";
import { logger } from "@/utils/logger";

const AdminLeases = () => {
  const { toast } = useToast();
  const [selectedLeaseId, setSelectedLeaseId] = useState<string | null>(null);

  const { data: leases, isLoading } = useQuery({
    queryKey: ['leases'],
    queryFn: async () => {
      logger.info("Fetching leases data");
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
        logger.error("Error fetching leases:", error);
        toast({
          variant: "destructive",
          title: "Error fetching leases",
          description: error.message,
        });
        return [];
      }

      logger.info("Leases data fetched:", data?.length || 0, "leases found");
      return data as Lease[];
    },
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  logger.info("Rendering AdminLeases with", leases?.length || 0, "leases");

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lease Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all property leases
          </p>
        </div>

        {Array.isArray(leases) && <LeaseMetrics leases={leases} />}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <LeasesTable 
            leases={leases || []} 
            isLoading={isLoading}
            onLeaseSelect={setSelectedLeaseId}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLeases;