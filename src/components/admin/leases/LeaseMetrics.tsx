import { 
  CheckCircle2, Clock, FileText, Shield, 
  AlertTriangle, DollarSign, Users, Ban,
  Building2, UserCheck, Home, Award
} from "lucide-react";
import { LeaseMetricCard } from "./LeaseMetricCard";
import { Lease } from "@/types/lease";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LeaseMetricsProps {
  leases: Lease[];
}

export const LeaseMetrics = ({ leases }: LeaseMetricsProps) => {
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
        .single();
      
      return data?.role;
    }
  });

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
        <LeaseMetricCard
          title="Active Leases"
          value={activeLeases}
          icon={CheckCircle2}
          iconColor="text-emerald-500"
          description="Currently active lease agreements"
          tooltip="Click to view all active leases"
          onClick={() => handleMetricClick("Active Leases")}
        />
      )}
      
      {(isAdmin || isPropertyManager) && (
        <LeaseMetricCard
          title="Pending Approvals"
          value={pendingLeases}
          icon={Clock}
          iconColor="text-amber-500"
          description="Awaiting review and approval"
          tooltip="Click to review pending leases"
          onClick={() => handleMetricClick("Pending Approvals")}
        />
      )}

      {(isAdmin || isPropertyManager || isOwner) && (
        <LeaseMetricCard
          title="Expiring Soon"
          value={expiringLeases}
          icon={AlertTriangle}
          iconColor="text-orange-500"
          description="Within 30 days"
          tooltip="Click to view leases expiring soon"
          onClick={() => handleMetricClick("Expiring Leases")}
        />
      )}

      {(isAdmin || isPropertyManager) && (
        <LeaseMetricCard
          title="Lease Violations"
          value={violations}
          icon={Ban}
          iconColor="text-red-500"
          description="Total lease violations"
          tooltip="Click to view lease violations"
          onClick={() => handleMetricClick("Lease Violations")}
        />
      )}

      {(isAdmin || isPropertyManager || isOwner) && (
        <LeaseMetricCard
          title="Security Deposits"
          value={`$${totalDeposits.toLocaleString()}`}
          icon={Shield}
          iconColor="text-blue-500"
          description="Total deposits held"
          tooltip="Click to manage security deposits"
          onClick={() => handleMetricClick("Security Deposits")}
        />
      )}

      {(isAdmin || isOwner) && (
        <LeaseMetricCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          iconColor="text-emerald-500"
          description="Total monthly rent collection"
          tooltip="Click to view revenue details"
          onClick={() => handleMetricClick("Monthly Revenue")}
        />
      )}

      {(isAdmin || isPropertyManager) && (
        <LeaseMetricCard
          title="Retention Rate"
          value={`${retentionRate}%`}
          icon={Users}
          iconColor="text-purple-500"
          description="Auto-renewal rate"
          tooltip="Click to view tenant retention details"
          onClick={() => handleMetricClick("Retention Rate")}
        />
      )}

      {(isAdmin || isPropertyManager || isOwner) && (
        <LeaseMetricCard
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={Building2}
          iconColor="text-indigo-500"
          description="Current occupancy percentage"
          tooltip="Click to view occupancy details"
          onClick={() => handleMetricClick("Occupancy Rate")}
        />
      )}
    </div>
  );
};