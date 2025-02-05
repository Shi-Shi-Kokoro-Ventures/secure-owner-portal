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
          trend="up"
          trendValue="12%"
        />
        <StatCard
          title="Active Tenants"
          value="143"
          trend="up"
          trendValue="8%"
        />
        <StatCard
          title="Maintenance Requests"
          value="12"
          trend="down"
          trendValue="5%"
        />
        <StatCard
          title="Revenue"
          value="$52,000"
          trend="up"
          trendValue="15%"
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