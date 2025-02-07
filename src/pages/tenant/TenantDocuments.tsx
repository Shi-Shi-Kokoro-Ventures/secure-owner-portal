import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TenantDocuments = () => {
  const { toast } = useToast();

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

  const handleUpload = () => {
    toast({
      title: "Coming Soon",
      description: "Document upload feature will be available soon",
    });
  };

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
        <Button onClick={handleUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents && documents.length > 0 ? (
              documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {doc.document_type}
                  </TableCell>
                  <TableCell>{doc.document_type}</TableCell>
                  <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownload(doc.file_url)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No documents found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantDocuments;