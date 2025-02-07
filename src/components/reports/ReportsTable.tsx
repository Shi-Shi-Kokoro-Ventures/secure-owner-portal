import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: string;
  lastGenerated: string;
  frequency: string;
}

const mockReports: Report[] = [
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

export const ReportsTable = () => {
  return (
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
  );
};