import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Upload, FolderOpen } from "lucide-react";

const Files = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Files</h1>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Files
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder for file folders */}
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-6 w-6 text-primary" />
              <span>Contracts</span>
            </div>
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-6 w-6 text-primary" />
              <span>Inspection Reports</span>
            </div>
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-6 w-6 text-primary" />
              <span>Invoices</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Files;