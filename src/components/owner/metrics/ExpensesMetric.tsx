import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export const ExpensesMetric = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
        <Receipt className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$12,300</div>
        <p className="text-xs text-muted-foreground">This month's total</p>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>Maintenance</span>
            <span>$5,200</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Utilities</span>
            <span>$4,100</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Insurance</span>
            <span>$3,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};