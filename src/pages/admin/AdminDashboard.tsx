import { ActivityLog } from "@/components/admin/dashboard/ActivityLog"
import { QuickActions } from "@/components/admin/dashboard/QuickActions"
import { StatCard } from "@/components/admin/dashboard/StatCard"
import { Building2, Users, Wrench, DollarSign } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { AnnouncementDialog } from "@/components/admin/announcements/AnnouncementDialog"
import { AnnouncementList } from "@/components/admin/announcements/AnnouncementList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <img
                src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png"
                alt="Shi Shi Kokoro"
                className="h-8 w-auto mr-2"
              />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Shi Shi Kokoro
              </span>
            </div>
            <AnnouncementDialog />
          </div>
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
            className="bg-white dark:bg-gray-800"
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
            className="bg-white dark:bg-gray-800"
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
            className="bg-white dark:bg-gray-800"
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
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <QuickActions />
            <ActivityLog />
          </div>
          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>System Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <AnnouncementList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}