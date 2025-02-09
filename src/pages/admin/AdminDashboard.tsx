
import { ActivityLog } from "@/components/admin/dashboard/ActivityLog"
import { QuickActions } from "@/components/admin/dashboard/QuickActions"
import { StatCard } from "@/components/shared/StatCard"
import { Building2, Users, Wrench, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your property management system.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActions />
        </CardContent>
      </Card>

      {/* Activity and Announcements Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityLog />
        
        <Card>
          <CardHeader>
            <CardTitle>System Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <AnnouncementList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
