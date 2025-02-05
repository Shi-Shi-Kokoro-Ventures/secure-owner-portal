
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, FileText, Megaphone, Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Alert {
  severity: 'critical' | 'warning' | 'info';
  message: string;
}

interface Activity {
  icon: React.ElementType;
  title: string;
  time: string;
  description: string;
}

export const SystemAlerts = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const alerts: Alert[] = [
    { severity: 'critical', message: '5 property manager approvals pending' },
    { severity: 'warning', message: '3 pending maintenance approvals' },
    { severity: 'info', message: '2 new property manager applications' }
  ];

  const severityColors = {
    critical: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500'
  };

  const severityIcons = {
    critical: '🔴',
    warning: '🟡',
    info: '🔵'
  };

  return (
    <Card className="bg-white dark:bg-gray-800 transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            System Alerts
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className={cn("h-2 w-2 rounded-full", severityColors[alert.severity])} />
                <div className="flex items-center gap-2">
                  <span className="text-sm">{severityIcons[alert.severity]}</span>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export const RecentActivity = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activities: Activity[] = [
    {
      icon: Megaphone,
      title: "System Announcement Sent",
      time: "2 hours ago",
      description: "Monthly maintenance schedule published"
    },
    {
      icon: FileText,
      title: "Lease Agreement Approved",
      time: "4 hours ago",
      description: "Unit 304 lease approved"
    },
    {
      icon: Wrench,
      title: "Maintenance Request Escalated",
      time: "5 hours ago",
      description: "Emergency plumbing issue - Building A"
    }
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Bell className="h-5 w-5 text-blue-500" />
            Recent Activity
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/5">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export const ActivityLog = () => (
  <div className="grid gap-8 md:grid-cols-2">
    <SystemAlerts />
    <RecentActivity />
  </div>
);
