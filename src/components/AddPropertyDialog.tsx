import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddPropertyForm } from "./AddPropertyForm";

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const AddPropertyDialog = ({ 
  open, 
  onOpenChange, 
  onSuccess, 
  onError 
}: AddPropertyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>
        <AddPropertyForm onSuccess={onSuccess} onError={onError} />
      </DialogContent>
    </Dialog>
  );
};