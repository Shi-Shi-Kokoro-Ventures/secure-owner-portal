import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpRight } from "lucide-react";

export const NetIncomeMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">Net Income</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <DollarSign className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$33,200</div>
        <p className="text-sm text-muted-foreground">This month</p>
        <div className="mt-4 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span>+12% vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};