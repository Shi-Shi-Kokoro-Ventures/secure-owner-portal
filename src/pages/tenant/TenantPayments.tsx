import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, Plus } from "lucide-react";

// Mock data - replace with actual API call
const mockPayments = [
  {
    id: "PAY-001",
    date: "2024-02-01",
    amount: "$1,200.00",
    status: "Completed",
    method: "Credit Card",
  },
  {
    id: "PAY-002",
    date: "2024-01-01",
    amount: "$1,200.00",
    status: "Completed",
    method: "Bank Transfer",
  },
];

const TenantPayments = () => {
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
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Statement
        </Button>
        <Button>
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
            {mockPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </TableCell>
                <TableCell>{payment.method}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantPayments;