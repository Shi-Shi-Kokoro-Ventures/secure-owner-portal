
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Archive, MessageCircle, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TenantCommunicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyMessage, setReplyMessage] = useState("");

  // Fetch conversation and messages
  const { data: messageData, isLoading } = useQuery({
    queryKey: ["message", id],
    queryFn: async () => {
      // Get the message and its conversation
      const { data: message, error: messageError } = await supabase
        .from("messages")
        .select(`
          *,
          sender:sender_id(first_name, last_name),
          conversation:conversation_id(type)
        `)
        .eq("id", id)
        .single();

      if (messageError) throw messageError;
      return message;
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      if (!messageData) return;
      const { error } = await supabase
        .from("messages")
        .update({ status: "read" })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["message", id] });
      toast({
        title: "Message marked as read",
        description: "The message has been marked as read.",
      });
    },
  });

  // Archive mutation
  const archiveMutation = useMutation({
    mutationFn: async () => {
      // In a real implementation, you would add an archived column to the messages table
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
    },
    onSuccess: () => {
      toast({
        title: "Message archived",
        description: "The message has been archived successfully.",
      });
      navigate("/tenant/communications");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!messageData) return;
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Message deleted",
        description: "The message has been deleted successfully.",
      });
      navigate("/tenant/communications");
    },
  });

  // Reply mutation
  const replyMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!messageData) throw new Error("No message data");

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: messageData.conversation_id,
          sender_id: userData.user.id,
          receiver_id: messageData.sender_id,
          message_content: content,
          status: "sent",
          message_type: "text"
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setReplyMessage("");
      toast({
        title: "Reply sent",
        description: "Your reply has been sent successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const handleArchive = () => {
    archiveMutation.mutate();
  };

  const handleDelete = () => {
    deleteMutation.mutate();
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
    if (messageData?.status !== "read" && !markAsReadMutation.isPending) {
      markAsReadMutation.mutate();
    }
  }, [messageData?.status, markAsReadMutation.isPending]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!messageData) {
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
                    onClick={() => setReplyMessage("")}
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
          <h1 className="text-2xl font-bold">{messageData.message_content.substring(0, 50)}...</h1>
          <div className="flex items-center gap-4 text-muted-foreground mt-2">
            <span>From: {messageData.sender.first_name} {messageData.sender.last_name}</span>
            <span>Date: {new Date(messageData.created_at).toLocaleDateString()}</span>
            {messageData.status !== "read" && (
              <span className="flex items-center gap-1 text-blue-500">
                <MessageCircle className="h-4 w-4" />
                Unread
              </span>
            )}
          </div>
        </div>

        <div className="prose max-w-none">
          <p>{messageData.message_content}</p>
        </div>
      </div>
    </div>
  );
};

export default TenantCommunicationDetail;
