import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Phone, Video, MoreVertical, Paperclip, Mic, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { logger } from "@/utils/logger";
import { MessageList } from "@/components/messages/MessageList";
import { ComposeMessageDialog } from "@/components/messages/ComposeMessageDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MESSAGES_PER_PAGE = 10;

const Messages = () => {
  // *burp* Listen up! This is where we keep track of all our interdimensional message stuff
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { toast } = useToast();

  // This query is like cable TV for your messages, Morty!
  // But instead of interdimensional channels, you get conversation threads
  const { data, isLoading, error } = useQuery({
    queryKey: ['messages', currentPage, searchQuery],
    queryFn: async () => {
      // Time to get riggity riggity wrecked with some database queries!
      let query = supabase
        .from('messages')
        .select(`
          id,
          sender:users!messages_sender_id_fkey(
            first_name,
            last_name,
            profile_picture_url
          ),
          message_content,
          created_at
        `)
        .order('created_at', { ascending: false })
        .range(currentPage * MESSAGES_PER_PAGE, (currentPage + 1) * MESSAGES_PER_PAGE - 1);

      // Aw jeez, Rick! We're filtering messages!
      if (searchQuery) {
        query = query.ilike('message_content', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        logger.error("Failed to fetch messages", error);
        throw error;
      }

      // Transform this data like we're making concentrated dark matter!
      return data.map(message => ({
        id: message.id,
        from: `${message.sender.first_name} ${message.sender.last_name}`,
        avatar: message.sender.profile_picture_url,
        content: message.message_content,
        date: new Date(message.created_at).toLocaleDateString(),
      }));
    },
  });

  // This function is like a portal gun for your search queries
  // Point it at what you want to find, and BAM! Results!
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
    logger.info("Search query updated", { query });
  };

  // In case something goes terribly wrong, like when Morty touches everything
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

  // The rest is just your regular old Earth dimension C-137 JSX
  return (
    <Layout>
      <ErrorBoundary>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left sidebar - Conversations list */}
          <div className="w-80 border-r bg-white">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Messages</h1>
                <ComposeMessageDialog />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-12rem)]">
              {data?.map((message) => (
                <div key={message.id} className="p-4 hover:bg-gray-50 cursor-pointer border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.from.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{message.from}</h3>
                        <span className="text-xs text-gray-500">{message.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Chat view */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data?.[0]?.avatar} />
                    <AvatarFallback>{data?.[0]?.from.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium">{data?.[0]?.from}</h2>
                    <span className="text-sm text-gray-500">Active now</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Messages will be rendered here */}
            </div>

            {/* Message input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Messages;
