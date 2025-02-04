import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardCheck, Download, Filter, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Applications = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} functionality coming soon`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">
            Manage and review rental applications
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">New Applications</span>
            </div>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium">In Review</span>
            </div>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Approved</span>
            </div>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAction('Filter')}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction('Print')}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction('Export')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Applications Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Applications;