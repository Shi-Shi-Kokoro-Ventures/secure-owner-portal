import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const LeaseRenewalMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Lease Renewals</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">2</div>
        <p className="text-sm text-muted-foreground">Due within 30 days</p>
        <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
          <span>Review pending</span>
        </div>
      </CardContent>
    </Card>
  );
};