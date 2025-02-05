import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export const PropertyValueMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Property Value</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">$4.2M</div>
        <p className="text-sm text-muted-foreground">Total portfolio value</p>
        <div className="mt-4 flex items-center text-sm font-medium text-green-600">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span>+5.2% this year</span>
        </div>
      </CardContent>
    </Card>
  );
};