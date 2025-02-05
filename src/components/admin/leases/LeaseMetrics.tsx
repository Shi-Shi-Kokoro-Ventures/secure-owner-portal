import { CheckCircle2, Clock, FileText, Shield, AlertTriangle, DollarSign, Users } from "lucide-react";
import { LeaseMetricCard } from "./LeaseMetricCard";
import { Lease } from "@/types/lease";

interface LeaseMetricsProps {
  leases: Lease[];
}

export const LeaseMetrics = ({ leases }: LeaseMetricsProps) => {
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

  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
      <LeaseMetricCard
        title="Active Leases"
        value={activeLeases}
        icon={CheckCircle2}
        iconColor="text-green-500"
      />
      <LeaseMetricCard
        title="Pending Approvals"
        value={pendingLeases}
        icon={Clock}
        iconColor="text-yellow-500"
      />
      <LeaseMetricCard
        title="Expiring Soon"
        value={expiringLeases}
        icon={AlertTriangle}
        iconColor="text-orange-500"
        description="Within 30 days"
      />
      <LeaseMetricCard
        title="Security Deposits"
        value={`$${totalDeposits.toLocaleString()}`}
        icon={Shield}
        iconColor="text-blue-500"
      />
      <LeaseMetricCard
        title="Monthly Revenue"
        value={`$${monthlyRevenue.toLocaleString()}`}
        icon={DollarSign}
        iconColor="text-emerald-500"
      />
      <LeaseMetricCard
        title="Retention Rate"
        value={`${retentionRate}%`}
        icon={Users}
        iconColor="text-purple-500"
        description="Auto-renewal rate"
      />
    </div>
  );
};