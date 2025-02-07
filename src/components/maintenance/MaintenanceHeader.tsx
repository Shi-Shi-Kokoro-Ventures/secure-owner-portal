
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MaintenanceHeader = () => {
  const navigate = useNavigate();

  const handleNewRequest = () => {
    navigate('/tenant/maintenance/new');
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Maintenance Requests
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage your maintenance requests
        </p>
      </div>
      <Button 
        onClick={handleNewRequest}
        className="bg-primary hover:bg-primary/90 text-white transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Request
      </Button>
    </div>
  );
};
