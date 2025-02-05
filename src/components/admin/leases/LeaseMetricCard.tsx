
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface LeaseMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
}

export const LeaseMetricCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-500",
}: LeaseMetricCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};
