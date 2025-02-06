
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
      <div className="min-h-screen bg-background/95">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary-800 dark:text-primary-200">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's an overview of your property management system.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
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

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-primary/10">
                <CardHeader className="border-b border-primary/10 bg-card p-6">
                  <CardTitle className="text-xl font-semibold text-primary-800 dark:text-primary-200">
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
            
            {/* Right Column */}
            <Card className="overflow-hidden border-primary/10 h-fit">
              <CardHeader className="border-b border-primary/10 bg-card p-6">
                <CardTitle className="text-xl font-semibold text-primary-800 dark:text-primary-200">
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
