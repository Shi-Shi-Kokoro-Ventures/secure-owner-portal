import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Archive, Check, MessageCircle, Plus, Search, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
interface Communication {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: "notification" | "message";
  from: string;
}

// Mock data - in a real app, this would come from an API
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
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>("date");
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState({ subject: "", message: "" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch communications data
  const { data: communications, isLoading } = useQuery({
    queryKey: ["communications"],
    queryFn: async () => {
      // Replace with actual API call
      return mockCommunications;
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async ({ id, isRead }: { id: string; isRead: boolean }) => {
      // Replace with actual API call
      const updatedComm = communications?.find(c => c.id === id);
      if (updatedComm) {
        updatedComm.isRead = isRead;
      }
      return updatedComm;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communications"] });
      toast({
        title: "Status updated",
        description: "Message status has been updated successfully.",
      });
    },
  });

  // Archive mutation
  const archiveMutation = useMutation({
    mutationFn: async (id: string) => {
      // Replace with actual API call
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communications"] });
      toast({
        title: "Message archived",
        description: "The message has been archived successfully.",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Replace with actual API call
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communications"] });
      toast({
        title: "Message deleted",
        description: "The message has been deleted successfully.",
      });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: { subject: string; message: string }) => {
      // Replace with actual API call
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communications"] });
      setIsComposeOpen(false);
      setNewMessage({ subject: "", message: "" });
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
    },
  });

  const handleMarkAsRead = (id: string, currentStatus: boolean) => {
    markAsReadMutation.mutate({ id, isRead: !currentStatus });
  };

  const handleArchive = (id: string) => {
    archiveMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    sendMessageMutation.mutate(newMessage);
  };

  const handleRowClick = (id: string) => {
    navigate(`/tenant/communications/${id}`);
  };

  const filteredCommunications = communications?.filter((comm) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "unread") return !comm.isRead;
    if (selectedTab === "read") return comm.isRead;
    return true;
  }).filter((comm) => {
    if (!searchQuery) return true;
    return (
      comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              <Input 
                placeholder="Subject"
                value={newMessage.subject}
                onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
              />
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[200px]"
                value={newMessage.message}
                onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsComposeOpen(false);
                    setNewMessage({ subject: "", message: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={sendMessageMutation.isPending}
                >
                  {sendMessageMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs
          defaultValue="all"
          className="w-full sm:w-[400px]"
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

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
                onClick={() => handleRowClick(comm.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMarkAsRead(comm.id, comm.isRead)}
                    className="hover:bg-muted"
                  >
                    {comm.isRead ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{comm.title}</TableCell>
                <TableCell>{comm.from}</TableCell>
                <TableCell>{comm.date}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
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