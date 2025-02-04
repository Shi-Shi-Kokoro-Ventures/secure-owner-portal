import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Filter, Mail, Printer, Search, Send } from "lucide-react";

const mockMailings = [
  {
    id: "1",
    subject: "Rent Increase Notice",
    recipients: "All Tenants",
    sentDate: "2024-02-20",
    status: "Sent",
  },
  {
    id: "2",
    subject: "Maintenance Schedule",
    recipients: "Building A Tenants",
    sentDate: "2024-02-19",
    status: "Draft",
  },
  {
    id: "3",
    subject: "Property Inspection Notice",
    recipients: "Selected Units",
    sentDate: "2024-02-18",
    status: "Scheduled",
  },
];

const Mailing = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mailing Wizard</h1>
          <p className="text-muted-foreground">
            Create and manage mail communications
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Total Mailings</span>
            </div>
            <p className="mt-2 text-2xl font-bold">45</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Sent</span>
            </div>
            <p className="mt-2 text-2xl font-bold">32</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium">Drafts</span>
            </div>
            <p className="mt-2 text-2xl font-bold">8</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Scheduled</span>
            </div>
            <p className="mt-2 text-2xl font-bold">5</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search mailings..."
              className="pl-10"
            />
          </div>
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
            <Button size="sm">
              <Mail className="h-4 w-4 mr-2" />
              New Mailing
            </Button>
          </div>
        </div>

        {/* Mailings Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMailings.map((mailing) => (
                <TableRow key={mailing.id}>
                  <TableCell className="font-medium">{mailing.subject}</TableCell>
                  <TableCell>{mailing.recipients}</TableCell>
                  <TableCell>{mailing.sentDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        mailing.status === "Sent"
                          ? "bg-green-100 text-green-700"
                          : mailing.status === "Draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {mailing.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
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

export default Mailing;