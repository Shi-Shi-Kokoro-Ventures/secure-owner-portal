import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { logger } from "@/utils/logger";
import { MessageList } from "@/components/messages/MessageList";
import { ComposeMessageDialog } from "@/components/messages/ComposeMessageDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Message } from "@/integrations/supabase/types/communication";

const MESSAGES_PER_PAGE = 10;

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['messages', currentPage, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('messages')
        .select(`
          id,
          sender:users!messages_sender_id_fkey(
            first_name,
            last_name
          ),
          message_content,
          created_at
        `)
        .order('created_at', { ascending: false })
        .range(currentPage * MESSAGES_PER_PAGE, (currentPage + 1) * MESSAGES_PER_PAGE - 1);

      if (searchQuery) {
        query = query.ilike('message_content', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        logger.error("Failed to fetch messages", error);
        throw error;
      }

      return data.map(message => ({
        id: message.id,
        from: `${message.sender.first_name} ${message.sender.last_name}`,
        subject: message.message_content.substring(0, 50) + (message.message_content.length > 50 ? "..." : ""),
        date: new Date(message.created_at).toLocaleDateString(),
      }));
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0); // Reset to first page on new search
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

  if (error) {
    return (
      <Layout>
        <ErrorBoundary>
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold text-red-600">Error loading messages</h2>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        </ErrorBoundary>
      </Layout>
    );
  }

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
            messages={data || []}
            isLoading={isLoading}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onView={handleView}
          />

          {data && data.length >= MESSAGES_PER_PAGE && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0 || isLoading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={data.length < MESSAGES_PER_PAGE || isLoading}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Messages;