
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { uploadTenantDocument } from "@/integrations/supabase/storage";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadDocumentDialog = ({ open, onOpenChange }: UploadDocumentDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("");

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile || !documentType) {
        throw new Error("Please select a file and enter a document type");
      }
      return await uploadTenantDocument(selectedFile, documentType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant-documents'] });
      onOpenChange(false);
      setSelectedFile(null);
      setDocumentType("");
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload document",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    uploadMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="documentType" className="block text-sm font-medium mb-1">
              Document Type
            </label>
            <Input
              id="documentType"
              placeholder="e.g., Lease Agreement, ID, Insurance"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium mb-1">
              Select File
            </label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || !documentType || uploadMutation.isPending}
            className="w-full"
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
