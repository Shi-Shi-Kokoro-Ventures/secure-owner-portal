import { ActivityLog } from "@/components/admin/dashboard/ActivityLog"
import { QuickActions } from "@/components/admin/dashboard/QuickActions"
import { StatCard } from "@/components/admin/dashboard/StatCard"
import { Building2, Users, Wrench, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
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

      <div className="grid gap-6 md:grid-cols-1">
        <QuickActions />
        <ActivityLog />
      </div>
    </div>
  )
}