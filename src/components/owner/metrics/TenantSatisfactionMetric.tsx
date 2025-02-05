import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export const TenantSatisfactionMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Tenant Satisfaction</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Users className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">4.8/5.0</div>
        <p className="text-sm text-muted-foreground">Average rating</p>
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 w-[96%] rounded-full bg-green-500 transition-all duration-500"></div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Based on 45 reviews
          </div>
        </div>
      </CardContent>
    </Card>
  );
};