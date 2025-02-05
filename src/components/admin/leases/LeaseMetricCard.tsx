import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LeaseMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
  tooltip?: string;
  onClick?: () => void;
}

export const LeaseMetricCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-primary-500",
  description,
  tooltip,
  onClick,
}: LeaseMetricCardProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={`relative overflow-hidden transition-all duration-300 
              ${onClick ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1' : ''}
              before:content-[''] before:absolute before:inset-0 
              before:bg-gradient-to-r before:from-primary-100/10 before:to-transparent 
              before:opacity-0 hover:before:opacity-100 before:transition-opacity
              animate-in fade-in slide-in-from-bottom-3 duration-500`}
            onClick={onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              <div className={`h-10 w-10 rounded-xl bg-opacity-10 bg-primary-100 dark:bg-primary-900/50 
                flex items-center justify-center transition-colors group-hover:bg-primary-200`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {value}
              </div>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};