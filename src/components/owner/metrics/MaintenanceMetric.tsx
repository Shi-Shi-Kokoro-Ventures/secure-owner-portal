import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export const MaintenanceMetric = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
        <Wrench className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">3</div>
        <p className="text-xs text-muted-foreground">1 urgent request</p>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-red-600">Urgent</span>
            <span>1</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-yellow-600">In Progress</span>
            <span>2</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};