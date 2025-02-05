
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, FileText, Megaphone, Wrench } from "lucide-react";

export const SystemAlerts = () => (
  <Card className="transition-all duration-300 hover:shadow-md">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        System Alerts
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <p className="text-sm font-medium">5 property manager approvals pending</p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <p className="text-sm font-medium">3 pending maintenance approvals</p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <p className="text-sm font-medium">2 new property manager applications</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const RecentActivity = () => (
  <Card className="transition-all duration-300 hover:shadow-md">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
        <Bell className="h-5 w-5 text-blue-500" />
        Recent Activity
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Megaphone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">System Announcement Sent</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Lease Agreement Approved</p>
            <p className="text-xs text-muted-foreground">4 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Maintenance Request Escalated</p>
            <p className="text-xs text-muted-foreground">5 hours ago</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const ActivityLog = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <SystemAlerts />
    <RecentActivity />
  </div>
);
