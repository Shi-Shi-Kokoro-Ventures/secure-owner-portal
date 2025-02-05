import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Calendar, MapPin, MessageSquare, Loader2, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const OwnerMaintenanceDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newUpdate, setNewUpdate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [updates, setUpdates] = useState([
    {
      date: "Feb 1, 2024",
      message: "Maintenance request submitted",
      author: "John Smith (Tenant)"
    },
    {
      date: "Feb 1, 2024",
      message: "Request received and assigned to maintenance team",
      author: "Property Owner"
    }
  ]);

  // This would typically fetch the maintenance request details using the ID
  const request = {
    id,
    title: "HVAC Repair",
    property: "123 Main St, Unit 4",
    status: requestStatus,
    date: "Feb 1, 2024",
    description: "The air conditioning unit is not cooling properly and making unusual noises.",
    tenant: "John Smith",
    priority: "High",
    category: "HVAC",
    updates: updates
  };

  const handleStatusUpdate = async (newStatus: 'approved' | 'rejected') => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const statusMessage = newStatus === 'approved' 
        ? "Maintenance request approved"
        : "Maintenance request rejected";

      const newUpdateObj = {
        date: currentDate,
        message: statusMessage,
        author: "Property Owner",
      };

      setUpdates(prev => [...prev, newUpdateObj]);
      setRequestStatus(newStatus);
      
      toast({
        title: "Status Updated",
        description: `Maintenance request has been ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${newStatus} request. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleAddUpdate = async () => {
    if (!newUpdate.trim()) {
      toast({
        title: "Error",
        description: "Please enter an update message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const newUpdateObj = {
        date: currentDate,
        message: newUpdate,
        author: "Property Owner",
      };

      setUpdates(prev => [...prev, newUpdateObj]);
      setNewUpdate("");
      
      toast({
        title: "Update Added",
        description: "Your update has been successfully added to the maintenance request.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add update. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Maintenance Request Details</h1>
        <p className="text-muted-foreground">Request ID: {id}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Request Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">{request.title}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {request.property}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {request.date}
              </div>
            </div>
            <Badge
              variant={
                request.status === "pending"
                  ? "default"
                  : request.status === "approved"
                  ? "success"
                  : "destructive"
              }
            >
              {request.status}
            </Badge>
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{request.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Tenant</p>
                <p className="text-sm text-muted-foreground">{request.tenant}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Priority</p>
                <p className="text-sm text-muted-foreground">{request.priority}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-muted-foreground">{request.category}</p>
              </div>
            </div>

            {requestStatus === 'pending' && (
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleStatusUpdate('approved')}
                  className="flex items-center gap-2"
                  variant="default"
                >
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleStatusUpdate('rejected')}
                  className="flex items-center gap-2"
                  variant="destructive"
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                {updates.map((update, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-primary pl-4 pb-4"
                  >
                    <p className="text-sm font-medium">{update.date}</p>
                    <p className="text-sm">{update.message}</p>
                    <p className="text-sm text-muted-foreground">{update.author}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Textarea
                  placeholder="Add an update to this maintenance request..."
                  value={newUpdate}
                  onChange={(e) => setNewUpdate(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button 
                  onClick={handleAddUpdate} 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Update...
                    </>
                  ) : (
                    'Add Update'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerMaintenanceDetail;