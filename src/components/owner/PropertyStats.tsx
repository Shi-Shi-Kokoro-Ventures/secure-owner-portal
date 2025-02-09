
import { StatCard } from "@/components/shared/StatCard";
import { Building2, DollarSign, Home, Users } from "lucide-react";

export const PropertyStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Properties"
        value="4"
        description="Active properties"
        icon={Building2}
      />
      <StatCard
        title="Total Units"
        value="12"
        description="Across all properties"
        icon={Home}
        trend={{
          value: "+2 this month",
          positive: true
        }}
      />
      <StatCard
        title="Occupancy Rate"
        value="92%"
        description="Current occupancy"
        icon={Users}
        trend={{
          value: "+2.1%",
          positive: true
        }}
      />
      <StatCard
        title="Monthly Revenue"
        value="$24,500"
        description="This month"
        icon={DollarSign}
        trend={{
          value: "+15%",
          positive: true
        }}
      />
    </div>
  );
};
