import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export const TenantsMetric = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">19</div>
        <p className="text-xs text-muted-foreground">2 leases expiring soon</p>
        <div className="mt-2 text-xs text-yellow-600">
          <span>⚠️ Review needed</span>
        </div>
      </CardContent>
    </Card>
  );
};