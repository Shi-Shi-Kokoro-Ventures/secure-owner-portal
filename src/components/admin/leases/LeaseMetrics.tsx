
import { CheckCircle2, Clock, FileText, Shield } from "lucide-react";
import { LeaseMetricCard } from "./LeaseMetricCard";
import { Lease } from "@/types/lease";

interface LeaseMetricsProps {
  leases: Lease[];
}

export const LeaseMetrics = ({ leases }: LeaseMetricsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <LeaseMetricCard
        title="Active Leases"
        value={leases?.filter(lease => lease.status === 'active').length || 0}
        icon={CheckCircle2}
        iconColor="text-green-500"
      />
      <LeaseMetricCard
        title="Pending Review"
        value={leases?.filter(lease => lease.status === 'pending').length || 0}
        icon={Clock}
        iconColor="text-yellow-500"
      />
      <LeaseMetricCard
        title="Security Deposits"
        value={`$${leases?.reduce((acc, lease) => acc + Number(lease.deposit_amount), 0).toLocaleString()}`}
        icon={Shield}
        iconColor="text-blue-500"
      />
      <LeaseMetricCard
        title="Monthly Revenue"
        value={`$${leases?.reduce((acc, lease) => acc + Number(lease.monthly_rent), 0).toLocaleString()}`}
        icon={FileText}
        iconColor="text-blue-500"
      />
    </div>
  );
};
