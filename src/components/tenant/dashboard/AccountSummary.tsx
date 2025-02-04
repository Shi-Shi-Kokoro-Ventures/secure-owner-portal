import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, Home } from "lucide-react";

interface AccountSummaryProps {
  tenant: {
    name: string;
    leaseStart: string;
    leaseEnd: string;
    unit: string;
  };
}

export const AccountSummary = ({ tenant }: AccountSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Account Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{tenant.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Lease: {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-3">
          <Home className="h-4 w-4 text-muted-foreground" />
          <span>Unit: {tenant.unit}</span>
        </div>
      </CardContent>
    </Card>
  );
};