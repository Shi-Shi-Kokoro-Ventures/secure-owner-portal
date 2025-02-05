import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Files = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Files</h1>
        <p className="text-muted-foreground">Manage your documents and files</p>
      </div>

      <div className="mb-8">
        <Button className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Upload Files</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Documents</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No documents uploaded</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Images</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No images uploaded</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Other Files</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No other files uploaded</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <FolderOpen className="h-5 w-5" />
          <span className="text-sm">Storage usage: 0 MB</span>
        </div>
      </div>
    </div>
  );
};

export default Files;