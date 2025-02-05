import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OwnerDocuments = () => {
  const { toast } = useToast();

  const handleUpload = () => {
    // This is a placeholder for the upload functionality
    toast({
      title: "Upload initiated",
      description: "Document upload feature will be implemented with backend integration",
    });
  };

  const handleDownload = (documentName: string) => {
    // This is a placeholder for the download functionality
    toast({
      title: "Download initiated",
      description: `Downloading ${documentName}`,
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Access and manage your important documents
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Property Documents</CardTitle>
            <Button onClick={handleUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Property Agreement",
                "Insurance Policy",
                "Tax Documents",
              ].map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{doc}</p>
                      <p className="text-sm text-muted-foreground">
                        Last updated: Jan 15, 2024
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDocuments;