
import { Building2, FileText, UserPlus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Button 
        variant="outline"
        className="h-auto p-4 justify-start gap-3 hover:border-primary/50"
        onClick={() => navigate('/admin/users')}
      >
        <div className="p-2 rounded-full bg-primary/10">
          <UserPlus className="h-4 w-4 text-primary" />
        </div>
        <div className="text-left">
          <div className="font-semibold">Add Manager</div>
          <div className="text-sm text-muted-foreground">Create new property manager</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="h-auto p-4 justify-start gap-3 hover:border-primary/50"
      >
        <div className="p-2 rounded-full bg-primary/10">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <div className="text-left">
          <div className="font-semibold">Review Leases</div>
          <div className="text-sm text-muted-foreground">3 leases pending review</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="h-auto p-4 justify-start gap-3 hover:border-primary/50"
      >
        <div className="p-2 rounded-full bg-primary/10">
          <Wrench className="h-4 w-4 text-primary" />
        </div>
        <div className="text-left">
          <div className="font-semibold">Maintenance</div>
          <div className="text-sm text-muted-foreground">View maintenance requests</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="h-auto p-4 justify-start gap-3 hover:border-primary/50"
      >
        <div className="p-2 rounded-full bg-primary/10">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
        <div className="text-left">
          <div className="font-semibold">Properties</div>
          <div className="text-sm text-muted-foreground">Manage properties</div>
        </div>
      </Button>
    </div>
  );
};
