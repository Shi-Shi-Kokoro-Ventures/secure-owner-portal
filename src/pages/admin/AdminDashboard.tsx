
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
  Megaphone,
  UserPlus,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const StatCard = ({ title, value, description, icon: Icon, trend }: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: {
    value: string;
    positive: boolean;
  };
}) => (
  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
            {trend && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                trend.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {trend.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {trend.value}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className={`p-3 rounded-full ${title.includes('Revenue') ? 'bg-green-100' : 'bg-primary/10'}`}>
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button 
            variant="outline"
            className="h-auto p-4 justify-start gap-3 hover:border-primary/50"
            onClick={() => navigate('/admin/users')}
          >
            <div className="p-2 rounded-full bg-primary/10">
              <UserPlus className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Add Manager</div>
              <div className="text-sm text-muted-foreground">Create new property manager</div>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-auto p-4 justify-start gap-3 hover:border-primary/50"
          >
            <div className="p-2 rounded-full bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Review Leases</div>
              <div className="text-sm text-muted-foreground">3 leases pending review</div>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-auto p-4 justify-start gap-3 hover:border-primary/50"
          >
            <div className="p-2 rounded-full bg-primary/10">
              <Wrench className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Maintenance</div>
              <div className="text-sm text-muted-foreground">View maintenance requests</div>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-auto p-4 justify-start gap-3 hover:border-primary/50"
          >
            <div className="p-2 rounded-full bg-primary/10">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Properties</div>
              <div className="text-sm text-muted-foreground">Manage properties</div>
            </div>
          </Button>
        </div>

        {/* Stats Grid */}
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

        {/* Alerts and Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <p className="text-sm">5 property manager approvals pending</p>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <p className="text-sm">3 pending maintenance approvals</p>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <p className="text-sm">2 new property manager applications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Bell className="h-5 w-5 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Megaphone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">System Announcement Sent</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lease Agreement Approved</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Wrench className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Maintenance Request Escalated</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
