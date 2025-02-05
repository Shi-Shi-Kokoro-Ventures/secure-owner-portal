
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, FileText, Megaphone, Wrench } from "lucide-react";

export const SystemAlerts = () => (
  <Card className="bg-white border-gray-100">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        System Alerts
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <p className="text-sm text-gray-900">5 property manager approvals pending</p>
        </div>
        <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <p className="text-sm text-gray-900">3 pending maintenance approvals</p>
        </div>
        <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <p className="text-sm text-gray-900">2 new property manager applications</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const RecentActivity = () => (
  <Card className="bg-white border-gray-100">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <Bell className="h-5 w-5 text-blue-500" />
        Recent Activity
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAFC]">
            <Megaphone className="h-5 w-5 text-[#64748B]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">System Announcement Sent</p>
            <p className="text-xs text-[#64748B]">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAFC]">
            <FileText className="h-5 w-5 text-[#64748B]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Lease Agreement Approved</p>
            <p className="text-xs text-[#64748B]">4 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAFC]">
            <Wrench className="h-5 w-5 text-[#64748B]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Maintenance Request Escalated</p>
            <p className="text-xs text-[#64748B]">5 hours ago</p>
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
