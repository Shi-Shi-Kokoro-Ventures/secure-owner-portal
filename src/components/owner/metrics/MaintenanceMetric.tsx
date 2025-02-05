import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export const MaintenanceMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Maintenance</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Wrench className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">5</div>
        <p className="text-sm text-muted-foreground">Active requests</p>
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-600 font-medium">High Priority</span>
            <span className="text-gray-900">2</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-yellow-600 font-medium">Medium Priority</span>
            <span className="text-gray-900">3</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-medium">Low Priority</span>
            <span className="text-gray-900">0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};