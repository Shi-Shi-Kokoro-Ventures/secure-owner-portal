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
  ArrowRight,
} from "lucide-react";
import { AccountSummary } from "@/components/tenant/dashboard/AccountSummary";
import { PaymentHistory } from "@/components/tenant/dashboard/PaymentHistory";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for development
const mockData = {
  tenant: {
    name: "John Doe",
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    unit: "Apt 4B - 123 Main St",
    balance: 1200.00,
    nextRentDue: "2024-03-01",
    nextRentAmount: 1500.00,
    openRequests: 2,
    unreadNotifications: 3
  },
  recentPayments: [
    {
      id: "1",
      date: "2024-02-01",
      amount: 1500.00,
      status: "completed" as const,
    },
    {
      id: "2",
      date: "2024-01-01",
      amount: 1500.00,
      status: "completed" as const,
    },
  ]
};

const TenantDashboard = () => {
  const { toast } = useToast();

  // Use mock data directly during development
  const data = mockData;

  return (
    <div className="space-y-6">
      {/* Welcome Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Welcome back, {data.tenant.name}!</AlertTitle>
        <AlertDescription>
          Your next rent payment of ${data.tenant.nextRentAmount} is due on{" "}
          {new Date(data.tenant.nextRentDue).toLocaleDateString()}.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.tenant.balance}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.tenant.openRequests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lease End Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(data.tenant.leaseEnd).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.tenant.unreadNotifications}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/tenant/payments/new">
          <Button className="w-full" variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Make Payment
          </Button>
        </Link>
        <Link to="/tenant/maintenance/new">
          <Button className="w-full" variant="outline">
            <Wrench className="mr-2 h-4 w-4" />
            Submit Request
          </Button>
        </Link>
        <Link to="/tenant/documents">
          <Button className="w-full" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            View Documents
          </Button>
        </Link>
        <Link to="/tenant/communications">
          <Button className="w-full" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </Link>
      </div>

      {/* Account Summary */}
      <AccountSummary data={data.tenant} />

      {/* Payment History */}
      <PaymentHistory payments={data.recentPayments} />
    </div>
  );
};

export default TenantDashboard;