
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
      <div className="container mx-auto p-6 space-y-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's an overview of your property management system.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Properties"
            value="28"
            description="Total number of properties under management"
            icon={Building2}
            trend={{
              value: "12%",
              positive: true
            }}
            className="transform transition-all duration-200 hover:scale-105"
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
            className="transform transition-all duration-200 hover:scale-105"
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
            className="transform transition-all duration-200 hover:scale-105"
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
            className="transform transition-all duration-200 hover:scale-105"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <Card className="overflow-hidden border-none shadow-lg bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Quick Actions</CardTitle>
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
          
          <Card className="overflow-hidden border-none shadow-lg bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 h-fit">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">System Announcements</CardTitle>
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
