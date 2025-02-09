import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Archive, MessageCircle, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const TenantCommunicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const { data: message, isLoading } = useQuery({
    queryKey: ["communication", id],
    queryFn: async () => {
      // Replace with actual API call
      return mockCommunications.find((m) => m.id === id);
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      if (!message) return;
      // Replace with actual API call
      message.isRead = true;
      return message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communications"] });
      queryClient.invalidateQueries({ queryKey: ["communication", id] });
      toast({
        title: "Message marked as read",
        description: "The message has been marked as read.",
      });
    },
  });

  // Reply mutation
  const replyMutation = useMutation({
    mutationFn: async (replyText: string) => {
      // Replace with actual API call
      console.log("Sending reply:", replyText);
      return { success: true };
    },
    onSuccess: () => {
      setIsReplyOpen(false);
      setReplyMessage("");
      toast({
        title: "Reply sent",
        description: "Your reply has been sent successfully.",
      });
    },
  });

  const handleArchive = () => {
    toast({
      title: "Message archived",
      description: "The message has been archived successfully.",
    });
    navigate("/tenant/communications");
  };

  const handleDelete = () => {
    toast({
      title: "Message deleted",
      description: "The message has been deleted successfully.",
    });
    navigate("/tenant/communications");
  };

  const handleReply = () => {
    if (!replyMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }
    replyMutation.mutate(replyMessage);
  };

  useEffect(() => {
    if (message && !message.isRead && !markAsReadMutation.isPending) {
      markAsReadMutation.mutate();
    }
  }, [message?.isRead, markAsReadMutation.isPending]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!message) {
    return <div>Message not found</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => navigate("/tenant/communications")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Communications
        </Button>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Reply
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reply to message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Textarea
                  placeholder="Type your reply here..."
                  className="min-h-[200px]"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsReplyOpen(false);
                      setReplyMessage("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleReply}
                    disabled={replyMutation.isPending}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {replyMutation.isPending ? "Sending..." : "Send Reply"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleArchive}
          >
            <Archive className="h-4 w-4" />
            Archive
          </Button>
          <Button
            variant="destructive"
            className="gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-lg border">
        <div>
          <h1 className="text-2xl font-bold">{message.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mt-2">
            <span>From: {message.from}</span>
            <span>Date: {message.date}</span>
            {!message.isRead && (
              <span className="flex items-center gap-1 text-blue-500">
                <MessageCircle className="h-4 w-4" />
                Unread
              </span>
            )}
          </div>
        </div>

        <div className="prose max-w-none">
          <p>{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default TenantCommunicationDetail;