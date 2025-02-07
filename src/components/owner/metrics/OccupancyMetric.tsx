import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const OccupancyMetric = () => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-gray-500">Occupancy Rate</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
          <Building2 className="h-4 w-4 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">95%</div>
        <p className="text-sm text-gray-500">19 of 20 units occupied</p>
        <div className="mt-4 flex items-center text-sm font-medium text-green-600">
          <span>↑ 2.1% from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};