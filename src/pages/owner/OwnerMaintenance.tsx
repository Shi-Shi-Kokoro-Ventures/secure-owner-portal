import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const OwnerMaintenance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewDetails = (requestId: string) => {
    // For now, show a toast since the detail page isn't implemented yet
    toast({
      title: "Coming Soon",
      description: "Maintenance request details will be available soon.",
    });
    // Later this will navigate to: navigate(`/owner/maintenance/${requestId}`)
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Maintenance</h1>
        <p className="text-muted-foreground">
          Track and approve maintenance requests
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "m001",
                  title: "HVAC Repair",
                  property: "123 Main St, Unit 4",
                  status: "urgent",
                  date: "Feb 1, 2024",
                },
                {
                  id: "m002",
                  title: "Plumbing Issue",
                  property: "456 Oak Ave, Unit 2",
                  status: "in-progress",
                  date: "Jan 30, 2024",
                },
                {
                  id: "m003",
                  title: "Window Replacement",
                  property: "789 Pine St, Unit 1",
                  status: "completed",
                  date: "Jan 28, 2024",
                },
              ].map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Wrench className="h-5 w-5 text-primary" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{request.title}</p>
                        <Badge
                          variant={
                            request.status === "urgent"
                              ? "destructive"
                              : request.status === "completed"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {request.property} - {request.date}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(request.id)}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Requests</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Wrench className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Being handled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerMaintenance;