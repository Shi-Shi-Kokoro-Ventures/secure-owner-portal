import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Archive, Check, MessageCircle, Plus, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

// Types for our data
interface Communication {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: "notification" | "message";
  from: string;
}

// Mock data - replace with actual API call
const mockCommunications: Communication[] = [
  {
    id: "MSG-001",
    title: "Maintenance Update",
    message: "Your maintenance request #1234 has been completed. Please review and confirm.",
    date: "2024-02-04",
    isRead: false,
    type: "notification",
    from: "Property Manager",
  },
  {
    id: "MSG-002",
    title: "Rent Reminder",
    message: "This is a friendly reminder that your rent payment is due in 5 days.",
    date: "2024-02-01",
    isRead: true,
    type: "message",
    from: "System",
  },
];

const TenantCommunications = () => {
  const [sortBy, setSortBy] = useState<string>("date");
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const { toast } = useToast();

  // Fetch communications data
  const { data: communications, isLoading } = useQuery({
    queryKey: ["communications"],
    queryFn: async () => {
      // Replace with actual API call
      return mockCommunications;
    },
  });

  const handleMarkAsRead = (id: string) => {
    toast({
      title: "Message marked as read",
      description: "The message has been marked as read.",
    });
  };

  const handleArchive = (id: string) => {
    toast({
      title: "Message archived",
      description: "The message has been archived successfully.",
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Message deleted",
      description: "The message has been deleted successfully.",
    });
  };

  const handleSendMessage = (message: string) => {
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
    setIsComposeOpen(false);
  };

  const filteredCommunications = communications?.filter((comm) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "unread") return !comm.isRead;
    if (selectedTab === "read") return comm.isRead;
    return true;
  });

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
          <p className="text-muted-foreground">
            View and manage your messages and notifications
          </p>
        </div>

        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Subject" />
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[200px]"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsComposeOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSendMessage("Test message")}>
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Tabs
          defaultValue="all"
          className="w-[400px]"
          onValueChange={setSelectedTab}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="unread">Unread First</SelectItem>
            <SelectItem value="importance">Importance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCommunications?.map((comm) => (
              <TableRow
                key={comm.id}
                className={`cursor-pointer hover:bg-muted/50 ${
                  !comm.isRead ? "font-medium" : ""
                }`}
              >
                <TableCell>
                  {comm.isRead ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{comm.title}</TableCell>
                <TableCell>{comm.from}</TableCell>
                <TableCell>{comm.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMarkAsRead(comm.id)}
                      className="hover:bg-muted"
                    >
                      {comm.isRead ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleArchive(comm.id)}
                      className="hover:bg-muted"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(comm.id)}
                      className="hover:bg-muted text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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