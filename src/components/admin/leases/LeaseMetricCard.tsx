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
  iconColor = "text-blue-500",
  description,
  tooltip,
  onClick,
}: LeaseMetricCardProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={`
              relative overflow-hidden transition-all duration-300 
              hover:shadow-lg hover:translate-y-[-2px] 
              ${onClick ? 'cursor-pointer' : ''}
              group
            `}
            onClick={onClick}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/5 group-hover:to-muted/10 transition-colors" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg ${iconColor}/10 flex items-center justify-center transition-transform group-hover:scale-110`}>
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
        </TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};