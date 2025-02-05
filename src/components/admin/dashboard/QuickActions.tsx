
import { Building2, FileText, UserPlus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Button 
        variant="outline"
        className="group flex h-auto flex-col items-start gap-4 p-6 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
        onClick={() => navigate('/admin/users')}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <div className="font-semibold">Add Manager</div>
          <div className="text-sm text-muted-foreground">Create new property manager</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="group flex h-auto flex-col items-start gap-4 p-6 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <div className="font-semibold">Review Leases</div>
          <div className="text-sm text-muted-foreground">3 leases pending review</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="group flex h-auto flex-col items-start gap-4 p-6 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
          <Wrench className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <div className="font-semibold">Maintenance</div>
          <div className="text-sm text-muted-foreground">View maintenance requests</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="group flex h-auto flex-col items-start gap-4 p-6 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <div className="font-semibold">Properties</div>
          <div className="text-sm text-muted-foreground">Manage properties</div>
        </div>
      </Button>
    </div>
  );
};
