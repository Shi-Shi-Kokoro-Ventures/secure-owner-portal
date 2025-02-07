
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MessageHeader } from "@/components/communications/MessageHeader";
import { MessageActions } from "@/components/communications/MessageActions";
import { MessageContent } from "@/components/communications/MessageContent";
import { useAuthenticatedQuery } from "@/hooks/use-authenticated-query";

interface MessageSender {
  id: string;
  first_name: string;
  last_name: string;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string | null;
  message_content: string;
  status: string;
  message_type: string;
  created_at: string;
  sender: MessageSender;
}

const TenantCommunicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messageData, isLoading } = useAuthenticatedQuery<Message>(
    ["message", id],
    async (userId) => {
      const { data: message, error } = await supabase
        .from("messages")
        .select(`
          *,
          sender:users!messages_sender_id_fkey(id, first_name, last_name)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!message) throw new Error("Message not found");
      return message;
    },
    {
      onAuthError: () => navigate("/auth"),
      enabled: !!id
    }
  );

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

  const replyMutation = useMutation({
    mutationFn: async (content: string) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("Not authenticated");
      if (!messageData) throw new Error("No message data");

      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: messageData.conversation_id,
          sender_id: user.id,
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
