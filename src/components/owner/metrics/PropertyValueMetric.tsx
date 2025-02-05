import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export const PropertyValueMetric = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Property Value</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$4.2M</div>
        <p className="text-xs text-muted-foreground">Total portfolio value</p>
        <div className="mt-2 flex items-center text-xs text-green-600">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span>+5.2% this year</span>
        </div>
      </CardContent>
    </Card>
  );
};