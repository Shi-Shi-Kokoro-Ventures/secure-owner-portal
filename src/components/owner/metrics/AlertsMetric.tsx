import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const AlertsMetric = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Alerts</CardTitle>
        <AlertCircle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">4</div>
        <p className="text-xs text-muted-foreground">Require attention</p>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-1 text-xs text-red-600">
            <span>●</span>
            <span>1 overdue payment</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-yellow-600">
            <span>●</span>
            <span>3 pending approvals</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};