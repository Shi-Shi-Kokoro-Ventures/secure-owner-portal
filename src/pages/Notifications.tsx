import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle } from "lucide-react";

const Notifications = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
        
        <div className="space-y-4">
          {/* Placeholder for notifications */}
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-start gap-4">
              <Bell className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">New Maintenance Request</h3>
                <p className="text-gray-600">A new maintenance request has been submitted for 123 Main St.</p>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;