import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpRight } from "lucide-react";

export const NetIncomeMetric = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Net Income</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$33,200</div>
        <p className="text-xs text-muted-foreground">This month</p>
        <div className="mt-2 flex items-center text-xs text-green-600">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span>+12% vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};