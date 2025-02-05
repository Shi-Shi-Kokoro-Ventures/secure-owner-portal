
import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Wrench,
  DollarSign,
  TrendingUp,
  Megaphone,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { ActivityLog } from "@/components/admin/dashboard/ActivityLog";

const AdminDashboard = () => {
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
        body: { message: announcement },
        headers: { 'x-admin-id': user?.id }
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
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back! Here's an overview of your system's performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 transition-colors hover:bg-primary hover:text-white">
              <TrendingUp className="h-4 w-4" />
              View Reports
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Megaphone className="h-4 w-4" />
                  Broadcast Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Broadcast System Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
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
                    {isSubmitting ? "Broadcasting..." : "Send Announcement"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <QuickActions />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Properties"
            value="123"
            description="Active properties in system"
            icon={Building2}
            trend={{
              value: "+12%",
              positive: true
            }}
          />
          <StatCard
            title="Property Managers"
            value="24"
            description="Active managers"
            icon={Users}
            trend={{
              value: "+2",
              positive: true
            }}
          />
          <StatCard
            title="Maintenance Requests"
            value="45"
            description="12 high priority"
            icon={Wrench}
            trend={{
              value: "-5%",
              positive: false
            }}
          />
          <StatCard
            title="Monthly Revenue"
            value="$234.5k"
            description="+4.3% from last month"
            icon={DollarSign}
            trend={{
              value: "+4.3%",
              positive: true
            }}
          />
        </div>

        <ActivityLog />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
