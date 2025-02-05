import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BanknoteIcon, 
  ClipboardCheck, 
  FileText, 
  Wrench,
  UserPlus,
  MessageSquare,
  Upload,
  AlertCircle
} from "lucide-react";
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
            className="flex items-center gap-2 h-auto py-4 justify-start"
            onClick={() => handleAction('Request Funds Transfer')}
          >
            <BanknoteIcon className="h-4 w-4 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium">Request Funds Transfer</div>
              <div className="text-xs text-muted-foreground">Transfer available funds to your account</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto py-4 justify-start"
            onClick={() => navigate('/owner/maintenance')}
          >
            <Wrench className="h-4 w-4 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium">Maintenance Requests</div>
              <div className="text-xs text-muted-foreground">Review and approve work orders</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto py-4 justify-start"
            onClick={() => handleAction('View Lease Renewals')}
          >
            <FileText className="h-4 w-4 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium">Lease Renewals</div>
              <div className="text-xs text-muted-foreground">Review upcoming renewals</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto py-4 justify-start"
            onClick={() => handleAction('Review Applications')}
          >
            <UserPlus className="h-4 w-4 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium">Review Applications</div>
              <div className="text-xs text-muted-foreground">Screen new tenant applications</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto py-4 justify-start"
            onClick={() => handleAction('Send Messages')}
          >
            <MessageSquare className="h-4 w-4 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium">Send Messages</div>
              <div className="text-xs text-muted-foreground">Communicate with tenants</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto py-4 justify-start"
            onClick={() => handleAction('Upload Documents')}
          >
            <Upload className="h-4 w-4 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium">Upload Documents</div>
              <div className="text-xs text-muted-foreground">Add property documents</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto py-4 justify-start"
            onClick={() => handleAction('View Alerts')}
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium">View Alerts</div>
              <div className="text-xs text-muted-foreground">Check important notifications</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto py-4 justify-start"
            onClick={() => handleAction('Approve Applications')}
          >
            <ClipboardCheck className="h-4 w-4 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium">Approve Applications</div>
              <div className="text-xs text-muted-foreground">Review pending approvals</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};