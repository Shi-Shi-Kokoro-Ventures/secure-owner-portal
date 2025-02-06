
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export const StatCard = ({ title, value, description, icon: Icon, trend, className, onClick }: StatCardProps) => (
  <Card 
    className={cn(
      "relative overflow-hidden bg-card",
      "transition-all duration-200",
      "border border-border/50",
      "hover:shadow-lg hover:border-primary/20",
      "dark:hover:border-primary/30",
      onClick && "cursor-pointer",
      className
    )}
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
  >
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50/50 dark:bg-primary-900/20">
            <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {value}
            </h2>
            {trend && (
              <span className={cn(
                "inline-flex items-center text-sm font-medium",
                trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              )}>
                {trend.positive ? <ArrowUpRight className="mr-0.5 h-4 w-4" /> : <ArrowDownRight className="mr-0.5 h-4 w-4" />}
                {trend.value}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  </Card>
);
