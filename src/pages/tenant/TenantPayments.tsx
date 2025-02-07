import { useQuery } from "@tanstack/react-query";
import { useAuthenticatedQuery } from "@/hooks/use-authenticated-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, Plus } from "lucide-react";
import { logger } from "@/utils/logger";
import { Payment } from "@/types/payment.types";

const TenantPayments = () => {
  const { toast } = useToast();
  const { data: payments, isLoading, error } = useAuthenticatedQuery({
    queryKey: ['payments'],
    queryFn: async ({ user }) => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('tenant_id', user.id)
        .order('payment_date', { ascending: false });

      if (error) {
        logger.error('Error fetching payments:', error);
        throw error;
      }

      return data as Payment[];
    },
  });

  const handleMakePayment = () => {
    // Logic for making a payment
  };

  const handleDownloadStatement = () => {
    // Logic for downloading statement
  };

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="rounded-lg border p-4 bg-destructive/10 text-destructive">
          Error loading payments. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          View your payment history and make new payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <h3 className="font-semibold">Next Payment Due</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">$1,200.00</p>
          <p className="text-sm text-muted-foreground">Due on March 1, 2024</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleDownloadStatement}>
          <Download className="h-4 w-4 mr-2" />
          Download Statement
        </Button>
        <Button onClick={handleMakePayment}>
          <Plus className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Payment History */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading payments...
                </TableCell>
              </TableRow>
            ) : payments && payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                  <TableCell>${payment.amount_paid.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantPayments;
