
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MessageHeader } from "@/components/communications/MessageHeader";
import { MessageActions } from "@/components/communications/MessageActions";
import { MessageContent } from "@/components/communications/MessageContent";

const TenantCommunicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch conversation and messages
  const { data: messageData, isLoading } = useQuery({
    queryKey: ["message", id],
    queryFn: async () => {
      const { data: message, error: messageError } = await supabase
        .from("messages")
        .select(`
          *,
          sender:sender_id(*)
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
      toast({
        title: "Reply sent",
        description: "Your reply has been sent successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

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
        <MessageHeader />
        <MessageActions
          onArchive={() => archiveMutation.mutate()}
          onDelete={() => deleteMutation.mutate()}
          onReply={(message) => replyMutation.mutate(message)}
          isReplying={replyMutation.isPending}
        />
      </div>

      <MessageContent
        content={messageData.message_content}
        sender={messageData.sender}
        createdAt={messageData.created_at}
        status={messageData.status}
      />
    </div>
  );
};

export default TenantCommunicationDetail;
