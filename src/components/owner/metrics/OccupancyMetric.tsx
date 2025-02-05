import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const OccupancyMetric = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
        <Building2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">95%</div>
        <p className="text-xs text-muted-foreground">19 of 20 units occupied</p>
        <div className="mt-2 flex items-center text-xs text-green-600">
          <span>↑ 2.1% from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};