import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export const TenantsMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Active Tenants</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Users className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">19</div>
        <p className="text-sm text-muted-foreground">2 leases expiring soon</p>
        <div className="mt-4 flex items-center text-sm font-medium text-yellow-600">
          <span>⚠️ Review needed</span>
        </div>
      </CardContent>
    </Card>
  );
};