import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Check, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ApplicationReviewSection = () => {
  const { toast } = useToast();

  const handleAction = (action: string, applicant: string) => {
    toast({
      title: `Application ${action}`,
      description: `${applicant}'s application has been ${action.toLowerCase()}`,
    });
  };

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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleAction("Approved", "Michael Brown")}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleAction("Declined", "Michael Brown")}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleAction("Reviewed", "Michael Brown")}
                >
                  Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
              <div className="space-y-1">
                <p className="text-sm font-medium">Emily Wilson</p>
                <p className="text-sm text-muted-foreground">Unit 102 - 1 Bed</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleAction("Approved", "Emily Wilson")}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleAction("Declined", "Emily Wilson")}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleAction("Reviewed", "Emily Wilson")}
                >
                  Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};