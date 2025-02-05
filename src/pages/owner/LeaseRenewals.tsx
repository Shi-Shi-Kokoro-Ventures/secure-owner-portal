import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LeaseRenewals = () => {
  const { toast } = useToast();

  const handleReviewClick = (tenantName: string) => {
    toast({
      title: "Review Initiated",
      description: `Starting review for ${tenantName}'s lease renewal`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          Lease Renewals
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage and review upcoming lease renewals
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardContent className="pt-6">
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
                    onClick={() => handleReviewClick("John Smith")}
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
                    onClick={() => handleReviewClick("Sarah Johnson")}
                  >
                    Review
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaseRenewals;