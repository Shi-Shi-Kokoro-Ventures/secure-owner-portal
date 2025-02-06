import { 
  FileText, Clock, Shield, AlertTriangle, 
  DollarSign, Users, Ban, Building2 
} from "lucide-react";
import { StatCard } from "./StatCard";
import { Lease } from "@/types/lease";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";

interface LeaseMetricsProps {
  leases: Lease[];
}

export const LeaseMetrics = ({ leases }: LeaseMetricsProps) => {
  const { toast } = useToast();
  
  // During development, default to admin role
  const { data: userRole = 'admin' } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          logger.warn('No authenticated user, defaulting to admin for development');
          return 'admin';
        }
        
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          logger.error('Error fetching user role:', error);
          // During development, default to admin if there's an error
          return 'admin';
        }
        
        if (!data?.role) {
          logger.warn('No user role found, defaulting to admin for development');
          return 'admin';
        }

        logger.info('User role fetched:', data.role);
        return data.role;
      } catch (error) {
        logger.error('Error in userRole query:', error);
        // During development, default to admin if there's an error
        return 'admin';
      }
    },
    staleTime: 0, // Don't cache during development
    retry: false, // Don't retry during development
    refetchOnWindowFocus: true,
  });

  logger.info(`Rendering LeaseMetrics with ${leases?.length || 0} leases`);

  const activeLeases = leases?.filter(lease => lease.status === 'active').length || 0;
  const pendingLeases = leases?.filter(lease => lease.status === 'pending').length || 0;
  const expiringLeases = leases?.filter(lease => {
    const endDate = new Date(lease.end_date);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return lease.status === 'active' && endDate <= thirtyDaysFromNow;
  }).length || 0;

  const totalDeposits = leases?.reduce((acc, lease) => acc + Number(lease.deposit_amount), 0) || 0;
  const monthlyRevenue = leases?.reduce((acc, lease) => acc + Number(lease.monthly_rent), 0) || 0;
  const retentionRate = leases?.length ? 
    ((leases.filter(lease => lease.auto_renewal).length / leases.length) * 100).toFixed(1) : 0;

  const violations = leases?.filter(lease => lease.status === 'terminated').length || 0;
  const occupancyRate = leases?.length ? 
    ((leases.filter(lease => lease.status === 'active').length / leases.length) * 100).toFixed(1) : 0;

  const handleMetricClick = (metric: string) => {
    toast({
      title: `${metric} Details`,
      description: `Viewing detailed information for ${metric.toLowerCase()} will be available in the next update.`,
    });
  };

  const isAdmin = userRole === 'admin';
  const isPropertyManager = userRole === 'property_manager';
  const isOwner = userRole === 'owner';

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {(isAdmin || isPropertyManager || isOwner) && (
        <StatCard
          title="Active Leases"
          value={activeLeases.toString()}
          icon={FileText}
          description="Currently active lease agreements"
          onClick={() => handleMetricClick("Active Leases")}
        />
      )}
      
      {(isAdmin || isPropertyManager) && (
        <StatCard
          title="Pending Approvals"
          value={pendingLeases.toString()}
          icon={Clock}
          description="Awaiting review and approval"
          onClick={() => handleMetricClick("Pending Approvals")}
        />
      )}

      {(isAdmin || isPropertyManager || isOwner) && (
        <StatCard
          title="Expiring Soon"
          value={expiringLeases.toString()}
          icon={AlertTriangle}
          description="Within 30 days"
          onClick={() => handleMetricClick("Expiring Leases")}
        />
      )}

      {(isAdmin || isPropertyManager) && (
        <StatCard
          title="Lease Violations"
          value={violations.toString()}
          icon={Ban}
          description="Total lease violations"
          onClick={() => handleMetricClick("Lease Violations")}
        />
      )}

      {(isAdmin || isPropertyManager || isOwner) && (
        <StatCard
          title="Security Deposits"
          value={`$${totalDeposits.toLocaleString()}`}
          icon={Shield}
          description="Total deposits held"
          onClick={() => handleMetricClick("Security Deposits")}
        />
      )}

      {(isAdmin || isOwner) && (
        <StatCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          description="Total monthly rent collection"
          onClick={() => handleMetricClick("Monthly Revenue")}
        />
      )}

      {(isAdmin || isPropertyManager) && (
        <StatCard
          title="Retention Rate"
          value={`${retentionRate}%`}
          icon={Users}
          description="Auto-renewal rate"
          onClick={() => handleMetricClick("Retention Rate")}
        />
      )}

      {(isAdmin || isPropertyManager || isOwner) && (
        <StatCard
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={Building2}
          description="Current occupancy percentage"
          onClick={() => handleMetricClick("Occupancy Rate")}
        />
      )}
    </div>
  );
};