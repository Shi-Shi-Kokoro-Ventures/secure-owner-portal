import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  DollarSign,
  FileText,
  Home,
  MessageSquare,
  Wrench,
  Calendar,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const TenantDashboard = () => {
  return (
    <div className="container mx-auto px-4 space-y-8">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, John Doe</h1>
        <p className="text-muted-foreground">
          Here's an overview of your rental account
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg" className="gap-2">
          <Link to="/tenant/payments/new">
            <CreditCard className="h-5 w-5" />
            Make Payment
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="gap-2">
          <Link to="/tenant/maintenance/new">
            <Wrench className="h-5 w-5" />
            Submit Maintenance Request
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/tenant/payments">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,200.00</div>
              <p className="text-xs text-muted-foreground">Due in 5 days</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tenant/payments">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Rent Due</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">March 1, 2024</div>
              <p className="text-xs text-muted-foreground">$1,500.00</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tenant/maintenance">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tenant/communications">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity and Important Notices */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Rent Payment Processed</p>
                  <p className="text-xs text-muted-foreground">$1,500.00 - February 2024</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Maintenance Request #1234 Updated</p>
                  <p className="text-xs text-muted-foreground">Technician assigned</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FileText className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">New Document Available</p>
                  <p className="text-xs text-muted-foreground">Annual Inspection Report</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Notices</CardTitle>
            <CardDescription>Updates from property management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Building Maintenance Notice</p>
                  <p className="text-xs text-muted-foreground">
                    Scheduled maintenance on March 15, 2024
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Community Update</p>
                  <p className="text-xs text-muted-foreground">
                    New parking regulations starting next month
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Home className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Lease Renewal</p>
                  <p className="text-xs text-muted-foreground">
                    Your lease is up for renewal in 3 months
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantDashboard;