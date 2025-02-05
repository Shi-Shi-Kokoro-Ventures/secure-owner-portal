
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export const StatCard = ({ title, value, description, icon: Icon, trend }: StatCardProps) => (
  <Card className="relative overflow-hidden bg-white">
    <CardContent className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-[#64748B]">{title}</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAFC]">
            <Icon className="h-5 w-5 text-[#64748B]" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold text-gray-900">{value}</h2>
            {trend && (
              <span className={`inline-flex items-center text-sm font-medium ${
                trend.positive ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {trend.positive ? <ArrowUpRight className="mr-0.5 h-4 w-4" /> : <ArrowDownRight className="mr-0.5 h-4 w-4" />}
                {trend.value}
              </span>
            )}
          </div>
          <p className="text-sm text-[#64748B]">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
