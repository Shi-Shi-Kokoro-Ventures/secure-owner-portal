import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Wrench,
  DollarSign,
  AlertTriangle,
  Bell,
  Plus,
  FileText,
  Megaphone,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [announcement, setAnnouncement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBroadcastAnnouncement = async () => {
    if (!announcement.trim()) {
      toast({
        title: "Error",
        description: "Please enter an announcement message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.functions.invoke('broadcast-announcement', {
        body: { 
          message: announcement,
        },
        headers: {
          'x-admin-id': user?.id
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "System announcement has been broadcast to all users",
      });
      setAnnouncement("");
    } catch (error) {
      console.error('Error broadcasting announcement:', error);
      toast({
        title: "Error",
        description: "Failed to broadcast announcement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of system performance and key metrics
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button 
            className="gap-2"
            onClick={() => navigate('/admin/users')}
          >
            <UserPlus className="h-4 w-4" />
            Manage Property Managers
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Approve Leases
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Megaphone className="h-4 w-4" />
                Broadcast System Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Broadcast System Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your announcement message..."
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button 
                  onClick={handleBroadcastAnnouncement}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Broadcasting..." : "Broadcast Announcement"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs text-muted-foreground">
                98% occupancy rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Property Managers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Active managers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                12 high priority
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$234.5k</div>
              <p className="text-xs text-muted-foreground">
                +4.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Notifications */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  5 property manager approvals pending
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  3 pending maintenance approvals
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  2 new property manager applications
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="text-sm text-muted-foreground">
                  System announcement sent to all users - 2 hours ago
                </li>
                <li className="text-sm text-muted-foreground">
                  Lease agreement approved - 4 hours ago
                </li>
                <li className="text-sm text-muted-foreground">
                  Maintenance request escalated - 5 hours ago
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;