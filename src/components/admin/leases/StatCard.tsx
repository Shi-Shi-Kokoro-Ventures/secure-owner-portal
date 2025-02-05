import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
  tooltip?: string;
  onClick?: () => void;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-primary-500",
  description,
  tooltip,
  onClick,
}: StatCardProps) => {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "bg-white dark:bg-gray-800/50",
        "hover:shadow-lg transform hover:-translate-y-1",
        "before:content-[''] before:absolute before:inset-0",
        "before:bg-gradient-card before:from-primary-100/20 before:to-transparent",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        "animate-in fade-in slide-in-from-bottom-3 duration-500",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "h-10 w-10 rounded-xl",
          "bg-primary-100/80 dark:bg-primary-900/30",
          "flex items-center justify-center",
          "transition-colors group-hover:bg-primary-200"
        )}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};