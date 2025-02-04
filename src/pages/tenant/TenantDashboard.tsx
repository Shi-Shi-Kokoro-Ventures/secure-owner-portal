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
import { useQuery } from "@tanstack/react-query";

// Mock API call - replace with actual API call
const fetchDashboardData = async () => {
  try {
    // Simulate API call
    const response = await fetch('/api/tenant/dashboard');
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching dashboard data');
  }
};

const TenantDashboard = () => {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tenantDashboard'],
    queryFn: fetchDashboardData,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 space-y-8 animate-pulse">
        <div className="bg-gray-200 h-32 rounded-lg"></div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-gray-200 h-48 rounded-lg"></div>
          <div className="bg-gray-200 h-48 rounded-lg"></div>
          <div className="bg-gray-200 h-48 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem loading your dashboard. Please try refreshing the page or contact support if the problem persists.
          </AlertDescription>
        </Alert>
        <Button
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry Loading
        </Button>
      </div>
    );
  }

  // Use mock data when real data is not available
  const tenant = data?.tenant || {
    name: "John Doe",
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    unit: "Apt 4B - 123 Main St",
    balance: 1200.00,
    nextRentDue: "2024-03-01",
    nextRentAmount: 1500.00,
    openRequests: 2,
    unreadNotifications: 3
  };

  const recentPayments = data?.recentPayments || [
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
  ];

  const recentActivity = [
    {
      id: 1,
      type: "payment",
      title: "Rent Payment Processed",
      amount: 1500.00,
      description: "February 2024",
      date: "2 days ago",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "maintenance",
      title: "Maintenance Request #1234 Updated",
      description: "Technician assigned",
      date: "3 days ago",
      icon: Clock,
      color: "text-orange-500"
    },
    {
      id: 3,
      type: "document",
      title: "New Document Available",
      description: "Annual Inspection Report",
      date: "1 week ago",
      icon: FileText,
      color: "text-blue-500"
    }
  ];

  const importantNotices = [
    {
      id: 1,
      title: "Building Maintenance Notice",
      description: "Scheduled maintenance on March 15, 2024",
      icon: AlertCircle,
      color: "text-red-500"
    },
    {
      id: 2,
      title: "Community Update",
      description: "New parking regulations starting next month",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    {
      id: 3,
      title: "Lease Renewal",
      description: "Your lease is up for renewal in 3 months",
      icon: Home,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg p-6 border shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {tenant.name}</h1>
        <p className="text-muted-foreground">
          Here's an overview of your rental account
        </p>
      </div>

      {/* Account Summary & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <AccountSummary tenant={tenant} />
        </div>
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full gap-2">
            <Link to="/tenant/payments/new">
              <CreditCard className="h-5 w-5" />
              Make Payment
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full gap-2">
            <Link to="/tenant/maintenance/new">
              <Wrench className="h-5 w-5" />
              Submit Maintenance Request
            </Link>
          </Button>
        </div>
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
              <div className="text-2xl font-bold">${tenant.balance.toFixed(2)}</div>
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
              <div className="text-2xl font-bold">{new Date(tenant.nextRentDue).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <p className="text-xs text-muted-foreground">${tenant.nextRentAmount.toFixed(2)}</p>
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
              <div className="text-2xl font-bold">{tenant.openRequests}</div>
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
              <div className="text-2xl font-bold">{tenant.unreadNotifications}</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </Link>

      </div>

      {/* Payment History & Important Notices */}
      <div className="grid gap-6 md:grid-cols-2">
        <PaymentHistory payments={recentPayments} />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Important Notices</CardTitle>
                <CardDescription>Updates from property management</CardDescription>
              </div>
              <Link to="/tenant/communications" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {importantNotices.map((notice) => (
                <div key={notice.id} className="flex items-center gap-4">
                  <notice.icon className={`h-4 w-4 ${notice.color}`} />
                  <div>
                    <p className="text-sm font-medium">{notice.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notice.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantDashboard;