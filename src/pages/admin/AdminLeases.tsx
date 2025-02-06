import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeasesTable } from "@/components/admin/leases/LeasesTable";
import { LeaseMetrics } from "@/components/admin/leases/LeaseMetrics";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Lease } from "@/types/lease";
import { logger } from "@/utils/logger";

export default function AdminLeases() {
  const [selectedLease, setSelectedLease] = useState<string | null>(null);

  const { data: leases = [], isLoading } = useQuery({
    queryKey: ['leases'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('leases')
          .select(`
            *,
            tenant:tenant_id(first_name, last_name),
            unit:unit_id(
              unit_number,
              property:property_id(property_name)
            )
          `);

        if (error) {
          logger.error('Error fetching leases:', error);
          throw error;
        }

        return data as unknown as Lease[];
      } catch (error) {
        logger.error('Error in leases query:', error);
        throw error;
      }
    }
  });

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Lease Management</h1>
        <LeaseMetrics leases={leases} />
        <div className="mt-6">
          <LeasesTable 
            leases={leases} 
            isLoading={isLoading}
            onLeaseSelect={setSelectedLease}
          />
        </div>
      </div>
    </AdminLayout>
  );
}