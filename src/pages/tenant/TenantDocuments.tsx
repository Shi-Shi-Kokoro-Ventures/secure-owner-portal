
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { DocumentsTable } from "@/components/tenant/documents/DocumentsTable";
import { UploadDocumentDialog } from "@/components/tenant/documents/UploadDocumentDialog";

const TenantDocuments = () => {
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const { data: documents, isLoading } = useQuery({
    queryKey: ['tenant-documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load documents",
          variant: "destructive",
        });
        return [];
      }
      return data;
    },
  });

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Access and manage your important documents
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <DocumentsTable documents={documents} onDownload={handleDownload} />
      
      <UploadDocumentDialog 
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
      />
    </div>
  );
};

export default TenantDocuments;
