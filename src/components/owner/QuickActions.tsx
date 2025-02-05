import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BanknoteIcon, ClipboardCheck, FileText, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} functionality coming soon`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction('Request Funds Transfer')}
          >
            <BanknoteIcon className="h-4 w-4" />
            Request Funds Transfer
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate('/owner/maintenance')}
          >
            <Wrench className="h-4 w-4" />
            View Maintenance
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction('View Lease Renewals')}
          >
            <FileText className="h-4 w-4" />
            Lease Renewals
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleAction('Approve Applications')}
          >
            <ClipboardCheck className="h-4 w-4" />
            Approve Applications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};