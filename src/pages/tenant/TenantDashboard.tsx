
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
  Loader2,
} from "lucide-react";
import { AccountSummary } from "@/components/tenant/dashboard/AccountSummary";
import { PaymentHistory } from "@/components/tenant/dashboard/PaymentHistory";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuthenticatedQuery } from "@/hooks/use-authenticated-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/utils/formatters";

const fetchDashboardData = async (userId: string) => {
  // Fetch active lease details
  const { data: leaseData, error: leaseError } = await supabase
    .from('leases')
    .select(`
      *,
      units:unit_id (
        unit_number,
        property:property_id (
          property_name,
          address
        )
      )
    `)
    .eq('tenant_id', userId)
    .eq('status', 'active')
    .maybeSingle(); // Changed from .single() to .maybeSingle()

  if (leaseError) throw leaseError;

  // Fetch recent payments
  const { data: payments, error: paymentsError } = await supabase
    .from('payments')
    .select('*')
    .eq('tenant_id', userId)
    .order('payment_date', { ascending: false })
    .limit(5);

  if (paymentsError) throw paymentsError;

  // Fetch maintenance requests count
  const { count: openRequests, error: maintenanceError } = await supabase
    .from('maintenance_requests')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', userId)
    .in('status', ['pending', 'in_progress']);

  if (maintenanceError) throw maintenanceError;

  // Fetch unread notifications count
  const { count: unreadNotifications, error: notificationsError } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('receiver_id', userId)
    .eq('status', 'sent');

  if (notificationsError) throw notificationsError;

  return {
    lease: leaseData || null,
    payments: payments || [],
    openRequests: openRequests || 0,
    unreadNotifications: unreadNotifications || 0
  };
};

const TenantDashboard = () => {
  const { toast } = useToast();

  const { data, isLoading, error } = useAuthenticatedQuery(
    ['tenant-dashboard'],
    fetchDashboardData
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load dashboard data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const { lease, payments, openRequests, unreadNotifications } = data || {};

  // Show a different message if no lease is found
  if (!lease) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Active Lease Found</AlertTitle>
        <AlertDescription>
          You currently don't have any active leases in the system. Please contact your property manager for assistance.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Welcome back!</AlertTitle>
        <AlertDescription>
          Your next rent payment of {formatCurrency(lease?.monthly_rent || 0)} is due on{" "}
          {new Date(lease?.rent_due_day || Date.now()).toLocaleDateString()}.
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
            <div className="text-2xl font-bold">{formatCurrency(lease?.monthly_rent || 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openRequests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lease End Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lease?.end_date ? new Date(lease.end_date).toLocaleDateString() : 'N/A'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadNotifications}</div>
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
      {lease && (
        <AccountSummary
          tenant={{
            name: "", // This should come from the user profile
            leaseStart: lease.start_date,
            leaseEnd: lease.end_date,
            unit: `${lease.units?.unit_number} - ${lease.units?.property?.address}`
          }}
        />
      )}

      {/* Payment History */}
      <PaymentHistory
        payments={payments?.map(payment => ({
          id: payment.id,
          date: payment.payment_date,
          amount: payment.amount_paid,
          status: payment.status
        })) || []}
      />
    </div>
  );
};

export default TenantDashboard;
