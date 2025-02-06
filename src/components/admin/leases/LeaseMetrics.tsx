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
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LeaseMetricsProps {
  leases: Lease[];
}

export const LeaseMetrics = ({ leases }: LeaseMetricsProps) => {
  const { toast } = useToast();
  
  // During development, we'll use a default admin role
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const { data: userRole = 'admin', isLoading: isRoleLoading, error: roleError } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      // In development, return admin role immediately
      if (isDevelopment) {
        logger.info('Development mode: using default admin role');
        return 'admin';
      }

      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          logger.error('Auth error:', authError);
          throw authError;
        }

        if (!user) {
          logger.warn('No authenticated user found');
          throw new Error('No authenticated user found');
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

        logger.info('User role fetched:', data?.role);
        return data?.role || 'admin';
      } catch (error) {
        logger.error('Error in userRole query:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch user role. Please try again.",
        });
        // During development, fallback to admin role on error
        if (isDevelopment) return 'admin';
        throw error;
      }
    },
    // Only retry and refetch in production
    retry: isDevelopment ? 0 : 1,
    refetchOnWindowFocus: !isDevelopment,
  });

  if (roleError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>
          Failed to load user role. Please refresh the page and try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (isRoleLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg border bg-card animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-8 w-8 rounded-lg bg-muted"></div>
            </div>
            <div className="space-y-3">
              <div className="h-7 bg-muted rounded w-1/4"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!leases) {
    return (
      <Alert className="mb-4">
        <AlertDescription>
          No lease data available
        </AlertDescription>
      </Alert>
    );
  }

  const activeLeases = leases.filter(lease => lease.status === 'active').length;
  const pendingLeases = leases.filter(lease => lease.status === 'pending').length;
  const expiringLeases = leases.filter(lease => {
    const endDate = new Date(lease.end_date);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return lease.status === 'active' && endDate <= thirtyDaysFromNow;
  }).length;

  const totalDeposits = leases.reduce((acc, lease) => acc + Number(lease.deposit_amount), 0);
  const monthlyRevenue = leases.reduce((acc, lease) => acc + Number(lease.monthly_rent), 0);
  const retentionRate = leases.length ? 
    ((leases.filter(lease => lease.auto_renewal).length / leases.length) * 100).toFixed(1) : 0;

  const violations = leases.filter(lease => lease.status === 'terminated').length;
  const occupancyRate = leases.length ? 
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