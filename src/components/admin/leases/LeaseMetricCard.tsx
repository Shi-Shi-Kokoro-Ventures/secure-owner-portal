import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface LeaseMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
}

export const LeaseMetricCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-500",
  description,
}: LeaseMetricCardProps) => {
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`h-8 w-8 rounded-lg ${iconColor}/10 flex items-center justify-center`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animate-in fade-in slide-in-from-bottom-3 duration-500">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};