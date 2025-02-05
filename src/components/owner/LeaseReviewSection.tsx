import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LeaseReviewSection = () => {
  const { toast } = useToast();

  const handleReviewClick = () => {
    toast({
      title: "Review Initiated",
      description: "Lease review functionality coming soon",
    });
  };

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
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleReviewClick}
              >
                Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
              <div className="space-y-1">
                <p className="text-sm font-medium">Unit 205 - Sarah Johnson</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Expires in 45 days
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleReviewClick}
              >
                Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};