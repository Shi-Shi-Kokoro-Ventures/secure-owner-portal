import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Plus } from "lucide-react";

// Mock data - replace with actual API call
const mockMessages = [
  {
    id: "MSG-001",
    subject: "Maintenance Update",
    date: "2024-02-04",
    status: "Unread",
    from: "Property Manager",
  },
  {
    id: "MSG-002",
    subject: "Rent Reminder",
    date: "2024-02-01",
    status: "Read",
    from: "System",
  },
];

const TenantCommunications = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
        <p className="text-muted-foreground">
          View and manage your messages and notifications
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Messages List */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMessages.map((message) => (
              <TableRow key={message.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {message.subject}
                </TableCell>
                <TableCell>{message.from}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === "Unread"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantCommunications;