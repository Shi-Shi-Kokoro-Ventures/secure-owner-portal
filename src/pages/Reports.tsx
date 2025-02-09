import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart3, Download, FileText, Filter, Printer } from "lucide-react";

const mockReports = [
  {
    id: "1",
    name: "Monthly Income Statement",
    type: "Financial",
    lastGenerated: "2024-02-20",
    frequency: "Monthly",
  },
  {
    id: "2",
    name: "Tenant Payment History",
    type: "Payments",
    lastGenerated: "2024-02-19",
    frequency: "Weekly",
  },
  {
    id: "3",
    name: "Property Maintenance Log",
    type: "Maintenance",
    lastGenerated: "2024-02-18",
    frequency: "Daily",
  },
];

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage property management reports
          </p>
        </div>

        {/* Report Categories */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Financial Reports</span>
            </div>
            <p className="mt-2 text-2xl font-bold">12</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Property Reports</span>
            </div>
            <p className="mt-2 text-2xl font-bold">8</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Tenant Reports</span>
            </div>
            <p className="mt-2 text-2xl font-bold">15</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Custom Reports</span>
            </div>
            <p className="mt-2 text-2xl font-bold">5</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Reports Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.lastGenerated}</TableCell>
                  <TableCell>{report.frequency}</TableCell>
                  <TableCell className="text-right">
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
    </Layout>
  );
};

export default Reports;