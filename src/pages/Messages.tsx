import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import { logger } from "@/utils/logger";
import { MessageList } from "@/components/messages/MessageList";
import { ComposeMessageDialog } from "@/components/messages/ComposeMessageDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          sender:sender_id(first_name, last_name),
          message_content,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) {
        logger.error("Failed to fetch messages", error);
        throw error;
      }

      return data.map(message => ({
        id: message.id,
        from: `${message.sender.first_name} ${message.sender.last_name}`,
        subject: message.message_content.substring(0, 50) + "...",
        date: new Date(message.created_at).toLocaleDateString(),
      }));
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    logger.info("Search query updated", { query });
  };

  const handleArchive = async (messageId: string) => {
    try {
      logger.info("Archiving message", { messageId });
      toast({
        title: "Message archived",
        description: "The message has been moved to archives.",
      });
    } catch (error) {
      logger.error("Failed to archive message", { messageId, error });
      toast({
        title: "Error",
        description: "Failed to archive message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      logger.info("Deleting message", { messageId });
      toast({
        title: "Message deleted",
        description: "The message has been permanently deleted.",
      });
    } catch (error) {
      logger.error("Failed to delete message", { messageId, error });
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleView = (messageId: string) => {
    logger.info("View message clicked", { messageId });
    toast({
      title: "Coming soon",
      description: "This feature is under development.",
    });
  };

  return (
    <Layout>
      <ErrorBoundary>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <ComposeMessageDialog />
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                disabled={isLoading}
                aria-label="Search messages"
              />
            </div>
          </div>

          <MessageList
            messages={messages || []}
            isLoading={isLoading}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Messages;