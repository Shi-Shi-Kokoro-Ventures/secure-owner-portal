import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Check, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Applications = () => {
  const { toast } = useToast();

  const handleAction = (action: string, applicant: string) => {
    toast({
      title: `Application ${action}`,
      description: `${applicant}'s application has been ${action.toLowerCase()}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          Application Reviews
        </h1>
        <p className="text-muted-foreground text-lg">
          Review and manage tenant applications
        </p>
      </div>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardContent className="pt-6">
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
    </div>
  );
};

export default Applications;