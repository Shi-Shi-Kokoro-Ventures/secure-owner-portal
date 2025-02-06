
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
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-600">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
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
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60 border-primary/10"
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
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60 border-primary/10"
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
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60 border-primary/10"
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
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60 border-primary/10"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <Card className="overflow-hidden border border-primary/10 bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60">
                <CardHeader className="border-b border-primary/10 bg-primary/5 p-6">
                  <CardTitle className="text-2xl font-semibold text-primary-800 dark:text-primary-200">
                    Quick Actions
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Frequently used actions and tools
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <QuickActions />
                </CardContent>
              </Card>
              
              <ActivityLog />
            </div>
            
            <Card className="overflow-hidden border border-primary/10 bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60">
              <CardHeader className="border-b border-primary/10 bg-primary/5 p-6">
                <CardTitle className="text-2xl font-semibold text-primary-800 dark:text-primary-200">
                  System Announcements
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Important updates and notifications
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <AnnouncementList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
