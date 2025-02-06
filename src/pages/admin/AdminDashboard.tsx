
import { ActivityLog } from "@/components/admin/dashboard/ActivityLog"
import { QuickActions } from "@/components/admin/dashboard/QuickActions"
import { StatCard } from "@/components/admin/dashboard/StatCard"
import { Building2, Users, Wrench, DollarSign } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { AnnouncementList } from "@/components/admin/announcements/AnnouncementList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-6 space-y-6 max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your property management system.
          </p>
        </div>

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
            className="border shadow-md bg-white dark:bg-gray-800"
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
            className="border shadow-md bg-white dark:bg-gray-800"
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
            className="border shadow-md bg-white dark:bg-gray-800"
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
            className="border shadow-md bg-white dark:bg-gray-800"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="border shadow-md bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Frequently used actions and tools
                </p>
              </CardHeader>
              <CardContent>
                <QuickActions />
              </CardContent>
            </Card>
            
            <ActivityLog />
          </div>
          
          <Card className="border shadow-md bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">System Announcements</CardTitle>
              <p className="text-sm text-muted-foreground">
                Important updates and notifications
              </p>
            </CardHeader>
            <CardContent>
              <AnnouncementList />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
