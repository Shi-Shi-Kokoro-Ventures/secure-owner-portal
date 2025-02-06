import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, UserCheck, Ban, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeaseActionsProps {
  leaseId: string;
  isAdmin: boolean;
  isPropertyManager: boolean;
  onLeaseSelect?: (id: string) => void;
}

export const LeaseActions = ({ leaseId, isAdmin, isPropertyManager, onLeaseSelect }: LeaseActionsProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    if (action === "View Details" && onLeaseSelect) {
      onLeaseSelect(leaseId);
    }
    toast({
      title: action,
      description: `${action} for lease ${leaseId} will be available in the next update.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Lease Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAction("View Details")}>
          <FileText className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem onClick={() => handleAction("Edit Lease")}>
            <UserCheck className="mr-2 h-4 w-4" />
            Edit Lease
          </DropdownMenuItem>
        )}
        {(isAdmin || isPropertyManager) && (
          <DropdownMenuItem 
            onClick={() => handleAction("Terminate Lease")}
            className="text-red-600"
          >
            <Ban className="mr-2 h-4 w-4" />
            Terminate Lease
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};