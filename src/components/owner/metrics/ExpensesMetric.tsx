import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export const ExpensesMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Monthly Expenses</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Receipt className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">$12,300</div>
        <p className="text-sm text-muted-foreground">This month's total</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Maintenance</span>
            <span className="font-medium text-gray-900">$5,200</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Utilities</span>
            <span className="font-medium text-gray-900">$4,100</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Insurance</span>
            <span className="font-medium text-gray-900">$3,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};