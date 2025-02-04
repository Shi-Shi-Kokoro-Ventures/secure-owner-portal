import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

interface PaymentHistoryProps {
  payments: Payment[];
}

export const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className={`h-4 w-4 ${
                  payment.status === 'completed' ? 'text-green-500' :
                  payment.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                }`} />
                <div className="space-y-1">
                  <p className="text-sm font-medium">${payment.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};