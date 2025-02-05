import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const ApplicationReviewSection = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Application Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
              <div className="space-y-1">
                <p className="text-sm font-medium">Michael Brown</p>
                <p className="text-sm text-muted-foreground">Unit 304 - 2 Bed</p>
              </div>
              <Link to="/owner/applications">
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