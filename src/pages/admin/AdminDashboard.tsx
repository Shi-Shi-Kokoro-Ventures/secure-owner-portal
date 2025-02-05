import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Wrench,
  DollarSign,
  AlertTriangle,
  Bell,
  Plus,
  FileText,
  MessageSquare,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of system performance and key metrics
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Property Manager
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Approve Leases
          </Button>
          <Button className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Send Announcement
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs text-muted-foreground">
                98% occupancy rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                Across all roles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                12 high priority
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$234.5k</div>
              <p className="text-xs text-muted-foreground">
                +4.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Notifications */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  5 leases expiring this month
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  3 pending maintenance approvals
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  2 new property manager applications
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="text-sm text-muted-foreground">
                  New property manager added - 2 hours ago
                </li>
                <li className="text-sm text-muted-foreground">
                  Lease agreement approved - 4 hours ago
                </li>
                <li className="text-sm text-muted-foreground">
                  Maintenance request escalated - 5 hours ago
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;