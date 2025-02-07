import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpRight } from "lucide-react";

export const NetIncomeMetric = () => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-gray-500">Net Income</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
          <DollarSign className="h-4 w-4 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">$33,200</div>
        <p className="text-sm text-gray-500">This month</p>
        <div className="mt-4 flex items-center text-sm font-medium text-green-600">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span>+12% vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};