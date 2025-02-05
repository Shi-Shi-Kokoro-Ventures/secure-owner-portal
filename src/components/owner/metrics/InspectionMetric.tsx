import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const InspectionMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Property Inspections</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calendar className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">3</div>
        <p className="text-sm text-muted-foreground">Scheduled this month</p>
        <div className="mt-4 space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-blue-600 font-medium">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            <span>2 routine inspections</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-yellow-600 font-medium">
            <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
            <span>1 move-out inspection</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};