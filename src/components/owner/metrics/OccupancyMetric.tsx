import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const OccupancyMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Occupancy Rate</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">95%</div>
        <p className="text-sm text-muted-foreground">19 of 20 units occupied</p>
        <div className="mt-4 flex items-center text-sm font-medium text-green-600">
          <span className="flex items-center">
            ↑ 2.1% from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};