
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ActivityLog } from "@/components/admin/dashboard/ActivityLog"
import { QuickActions } from "@/components/admin/dashboard/QuickActions"
import { StatCard } from "@/components/admin/dashboard/StatCard"
import { Building2, Users, Wrench, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Properties"
            value="28"
            description="Total number of properties under management"
            icon={Building2}
            trend={{
              value: "12%",
              positive: true
            }}
          />
          <StatCard
            title="Active Tenants"
            value="143"
            description="Current number of active tenants"
            icon={Users}
            trend={{
              value: "8%",
              positive: true
            }}
          />
          <StatCard
            title="Maintenance Requests"
            value="12"
            description="Open maintenance requests"
            icon={Wrench}
            trend={{
              value: "5%",
              positive: false
            }}
          />
          <StatCard
            title="Revenue"
            value="$52,000"
            description="Total revenue this month"
            icon={DollarSign}
            trend={{
              value: "15%",
              positive: true
            }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <QuickActions />
            <ActivityLog />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
