
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
    critical: 'bg-destructive/10 text-destructive dark:bg-destructive/20',
    warning: 'bg-warning/10 text-warning dark:bg-warning/20',
    info: 'bg-info/10 text-info dark:bg-info/20'
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <AlertTriangle className="h-5 w-5 text-warning" />
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
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-4",
                  severityColors[alert.severity]
                )}
              >
                <p className="text-sm font-medium">{alert.message}</p>
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
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Bell className="h-5 w-5 text-primary" />
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
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
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
  <div className="grid gap-6">
    <SystemAlerts />
    <RecentActivity />
  </div>
);
