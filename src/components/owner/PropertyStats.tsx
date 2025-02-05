import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, DollarSign, Home, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => (
  <Card className="transition-all duration-300 hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">{description}</p>
        {trend && (
          <span className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

export const PropertyStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Properties"
        value="4"
        description="Active properties"
        icon={<Building2 className="h-4 w-4 text-primary" />}
      />
      <StatCard
        title="Total Units"
        value="12"
        description="Across all properties"
        icon={<Home className="h-4 w-4 text-primary" />}
        trend={{
          value: "+2 this month",
          positive: true
        }}
      />
      <StatCard
        title="Occupancy Rate"
        value="92%"
        description="Current occupancy"
        icon={<Users className="h-4 w-4 text-primary" />}
        trend={{
          value: "+2.1%",
          positive: true
        }}
      />
      <StatCard
        title="Monthly Revenue"
        value="$24,500"
        description="This month"
        icon={<DollarSign className="h-4 w-4 text-primary" />}
        trend={{
          value: "+15%",
          positive: true
        }}
      />
    </div>
  );
};