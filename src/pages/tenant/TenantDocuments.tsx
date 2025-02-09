import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Upload } from "lucide-react";

// Mock data - replace with actual API call
const mockDocuments = [
  {
    id: "DOC-001",
    name: "Lease Agreement",
    type: "PDF",
    dateUploaded: "2024-01-15",
    category: "Lease",
  },
  {
    id: "DOC-002",
    name: "Move-in Inspection",
    type: "PDF",
    dateUploaded: "2024-01-15",
    category: "Inspections",
  },
];

const TenantDocuments = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Access and manage your important documents
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Documents List */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDocuments.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {document.name}
                </TableCell>
                <TableCell>{document.type}</TableCell>
                <TableCell>{document.dateUploaded}</TableCell>
                <TableCell>{document.category}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantDocuments;