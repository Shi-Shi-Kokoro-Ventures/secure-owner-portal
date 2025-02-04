import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const OwnerCommunications = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Communications</h1>
        <p className="text-muted-foreground">
          Messages and notifications from your property manager
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">New Maintenance Request</CardTitle>
              <div className="text-sm text-muted-foreground">From Property Manager</div>
            </div>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Reply
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A new maintenance request has been submitted for 123 Main Street. Please review and approve.
            </p>
            <div className="mt-2 text-sm text-muted-foreground">
              Received: 2 hours ago
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Monthly Statement Available</CardTitle>
              <div className="text-sm text-muted-foreground">From Property Manager</div>
            </div>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Reply
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your monthly statement for January 2024 is now available for review.
            </p>
            <div className="mt-2 text-sm text-muted-foreground">
              Received: 1 day ago
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerCommunications;