import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle2, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Maintenance Request",
      description: "A new maintenance request has been submitted for 123 Main St.",
      type: "alert",
      date: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment Received",
      description: "Rent payment received for February 2024",
      type: "success",
      date: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Document Update",
      description: "New lease agreement has been uploaded",
      type: "info",
      date: "2 days ago",
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true }
        : notification
    ));
    
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with important alerts and messages
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  !notification.read ? "bg-accent/50" : ""
                } transition-colors`}
              >
                <div className="flex items-center gap-4">
                  {notification.type === "alert" ? (
                    <Bell className="h-5 w-5 text-destructive" />
                  ) : notification.type === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Info className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      {!notification.read && (
                        <Badge variant="destructive">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.date}
                    </p>
                  </div>
                </div>
                {!notification.read && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;