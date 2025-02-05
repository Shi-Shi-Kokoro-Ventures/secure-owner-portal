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

  const handleAction = (route: string, action: string) => {
    switch (action) {
      case 'Request Funds Transfer':
        navigate('/banking');
        break;
      case 'View Maintenance Requests':
        navigate('/work-orders');
        break;
      case 'View Lease Renewals':
        navigate('/tenants');
        break;
      case 'Review Applications':
        navigate('/applications');
        break;
      case 'Send Messages':
        navigate('/messages');
        break;
      case 'Upload Documents':
        navigate('/files');
        break;
      case 'View Alerts':
        navigate('/notifications');
        break;
      case 'Approve Applications':
        navigate('/applications');
        break;
      default:
        toast({
          title: "Navigation",
          description: `Navigating to ${route}`,
        });
        navigate(route);
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
            onClick={() => handleAction('/banking', 'Request Funds Transfer')}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <BanknoteIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Request Funds Transfer</div>
              <div className="text-sm text-muted-foreground">Transfer available funds to your account</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
            onClick={() => handleAction('/work-orders', 'View Maintenance Requests')}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Maintenance Requests</div>
              <div className="text-sm text-muted-foreground">Review and approve work orders</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
            onClick={() => handleAction('/tenants', 'View Lease Renewals')}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Lease Renewals</div>
              <div className="text-sm text-muted-foreground">Review upcoming renewals</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
            onClick={() => handleAction('/applications', 'Review Applications')}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Review Applications</div>
              <div className="text-sm text-muted-foreground">Screen new tenant applications</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
            onClick={() => handleAction('/messages', 'Send Messages')}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Send Messages</div>
              <div className="text-sm text-muted-foreground">Communicate with tenants</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
            onClick={() => handleAction('/files', 'Upload Documents')}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Upload Documents</div>
              <div className="text-sm text-muted-foreground">Add property documents</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
            onClick={() => handleAction('/notifications', 'View Alerts')}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <AlertCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">View Alerts</div>
              <div className="text-sm text-muted-foreground">Check important notifications</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-auto py-4 px-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
            onClick={() => handleAction('/applications', 'Approve Applications')}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <ClipboardCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Approve Applications</div>
              <div className="text-sm text-muted-foreground">Review pending approvals</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};