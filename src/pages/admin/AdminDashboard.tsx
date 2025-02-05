import { ActivityLog } from "@/components/admin/dashboard/ActivityLog"
import { QuickActions } from "@/components/admin/dashboard/QuickActions"
import { StatCard } from "@/components/admin/dashboard/StatCard"
import { VapiAssistant } from "@/components/admin/VapiAssistant"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Properties"
          value="28"
          description="Total number of properties under management"
          trend={{
            value: "12%",
            positive: true
          }}
        />
        <StatCard
          title="Active Tenants"
          value="143"
          description="Current number of active tenants"
          trend={{
            value: "8%",
            positive: true
          }}
        />
        <StatCard
          title="Maintenance Requests"
          value="12"
          description="Open maintenance requests"
          trend={{
            value: "5%",
            positive: false
          }}
        />
        <StatCard
          title="Revenue"
          value="$52,000"
          description="Total revenue this month"
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
        <VapiAssistant />
      </div>
    </div>
  )
}