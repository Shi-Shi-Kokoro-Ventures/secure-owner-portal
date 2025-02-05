import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const AlertsMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Alerts</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <AlertCircle className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">4</div>
        <p className="text-sm text-muted-foreground">Require attention</p>
        <div className="mt-4 space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-red-600 font-medium">
            <span className="h-2 w-2 rounded-full bg-red-600"></span>
            <span>1 overdue payment</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-yellow-600 font-medium">
            <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
            <span>3 pending approvals</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};