
import { Building2, FileText, UserPlus, Wrench, AlertCircle, CreditCard, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const actions = [
    {
      title: "Add Manager",
      description: "Add new manager",
      icon: UserPlus,
      route: "/admin/users",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Review Leases",
      description: "3 pending leases",
      icon: FileText,
      route: "/admin/leases",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Maintenance",
      description: "View requests",
      icon: Wrench,
      route: "/admin/maintenance",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Properties",
      description: "Manage properties",
      icon: Building2,
      route: "/admin/properties",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "System Alerts",
      description: "View alerts",
      icon: AlertCircle,
      route: "/admin/alerts",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      title: "Payments",
      description: "Process payments",
      icon: CreditCard,
      route: "/admin/payments",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      title: "Tenants",
      description: "Manage tenants",
      icon: Users,
      route: "/admin/tenants",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Settings",
      description: "System settings",
      icon: Settings,
      route: "/admin/settings",
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-900/20"
    }
  ];

  const handleAction = (route: string) => {
    navigate(route);
    toast({
      title: "Navigation",
      description: `Navigating to ${route}`,
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Button 
              key={action.title}
              variant="outline"
              className="group flex h-full min-h-[120px] w-full flex-col items-start gap-3 p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-100 dark:border-gray-700 transition-all duration-200"
              onClick={() => handleAction(action.route)}
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                action.bgColor
              )}>
                <action.icon className={cn("h-5 w-5", action.color)} />
              </div>
              <div className="space-y-0.5 w-full">
                <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">{action.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
