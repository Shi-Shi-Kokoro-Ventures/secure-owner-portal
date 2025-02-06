import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeaseMetrics } from "@/components/admin/leases/LeaseMetrics";
import { LeasesTable } from "@/components/admin/leases/LeasesTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { Lease } from "@/types/lease.types";
import { logger } from "@/utils/logger";

const AdminLeases = () => {
  const { toast } = useToast();
  const [selectedLeaseId, setSelectedLeaseId] = useState<string | null>(null);

  // Fetch user role directly, without depending on a separate auth query
  const { data: userRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        logger.error('Auth error:', authError);
        throw authError;
      }

      if (!user) {
        logger.error('No authenticated user');
        throw new Error('No authenticated user');
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      
      if (error) {
        logger.error('Error fetching user role:', error);
        throw error;
      }

      if (!data) {
        // During development, default to admin role if no role is found
        logger.warn('No user role found, defaulting to admin for development');
        return 'admin';
      }

      logger.info('User role fetched:', data.role);
      return data.role;
    },
    staleTime: 0, // Don't cache the role during development
    retry: false, // Don't retry during development
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  // Fetch leases with simplified dependency
  const { data: leases, isLoading: isLeasesLoading, error: leasesError } = useQuery({
    queryKey: ['leases', userRole],
    queryFn: async () => {
      logger.info('Fetching leases data');
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
        logger.error('Error fetching leases:', error.message);
        toast({
          variant: "destructive",
          title: "Error fetching leases",
          description: error.message,
        });
        throw error;
      }

      logger.info(`Leases data fetched successfully: ${data?.length || 0} leases found`);
      return data as Lease[];
    },
    enabled: !!userRole,
    staleTime: 0, // Don't cache during development
    refetchOnWindowFocus: true,
  });

  const isLoading = isRoleLoading || isLeasesLoading;

  if (leasesError) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
          <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg animate-in fade-in-50">
            Error loading leases. Please try again later.
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <ErrorBoundary>
        <div className="space-y-6 p-6 animate-in fade-in duration-500">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight font-montserrat">
              Lease Management
            </h1>
            <p className="text-muted-foreground font-inter">
              Manage and track all property leases
            </p>
          </div>

          {Array.isArray(leases) && (
            <ErrorBoundary>
              <LeaseMetrics leases={leases} />
            </ErrorBoundary>
          )}
          
          <ErrorBoundary>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <LeasesTable 
                leases={leases || []} 
                isLoading={isLoading}
                onLeaseSelect={setSelectedLeaseId}
              />
            </div>
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </AdminLayout>
  );
};

export default AdminLeases;