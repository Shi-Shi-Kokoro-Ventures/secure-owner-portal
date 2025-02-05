import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardCheck, FileText, Wrench } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Link to="/owner/applications">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Review Applications
            </Button>
          </Link>
          <Link to="/owner/maintenance">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Wrench className="h-5 w-5 text-primary" />
              View Maintenance Requests
            </Button>
          </Link>
          <Link to="/owner/documents">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <FileText className="h-5 w-5 text-primary" />
              Access Documents
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};