import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const LeaseReviewSection = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Lease Renewals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
              <div className="space-y-1">
                <p className="text-sm font-medium">Unit 101 - John Smith</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Expires in 30 days
                </div>
              </div>
              <Link to="/owner/lease-renewals">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};