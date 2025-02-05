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
}

export const StatCard = ({ title, value, description, icon: Icon, trend, className }: StatCardProps) => (
  <Card className={cn(
    "relative overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg",
    "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-100/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
    "animate-in fade-in slide-in-from-bottom-3 duration-500",
    className
  )}>
    <div className="p-6 relative z-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 transition-colors group-hover:bg-primary-200">
            <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {value}
            </h2>
            {trend && (
              <span className={cn(
                "inline-flex items-center text-sm font-medium transition-colors",
                trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              )}>
                {trend.positive ? <ArrowUpRight className="mr-0.5 h-4 w-4" /> : <ArrowDownRight className="mr-0.5 h-4 w-4" />}
                {trend.value}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  </Card>
);