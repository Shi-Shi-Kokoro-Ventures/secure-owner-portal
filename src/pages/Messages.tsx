import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Archive, Mail, Search, Trash } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import { logger } from "@/utils/logger";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  id: string;
  from: string;
  subject: string;
  date: string;
}

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simulate loading state for demonstration
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    logger.info("Search query updated", { query });
  };

  const handleArchive = async (messageId: string) => {
    try {
      setIsLoading(true);
      logger.info("Archiving message", { messageId });
      // Implement archive logic here
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      setIsLoading(true);
      logger.info("Deleting message", { messageId });
      // Implement delete logic here
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompose = () => {
    logger.info("Compose message clicked");
    toast({
      title: "Coming soon",
      description: "This feature is under development.",
    });
  };

  const LoadingRow = () => (
    <TableRow>
      <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
      <TableCell><Skeleton className="h-4 w-[300px]" /></TableCell>
      <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
      <TableCell><Skeleton className="h-8 w-[120px]" /></TableCell>
    </TableRow>
  );

  return (
    <Layout>
      <ErrorBoundary>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <Button 
              className="gap-2" 
              onClick={handleCompose}
              disabled={isLoading}
            >
              <Mail className="h-4 w-4" />
              Compose
            </Button>
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
            <Button 
              variant="outline" 
              size="icon"
              disabled={isLoading}
              onClick={() => {
                logger.info("Archive all clicked");
                toast({
                  title: "Coming soon",
                  description: "This feature is under development.",
                });
              }}
            >
              <Archive className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              disabled={isLoading}
              onClick={() => {
                logger.info("Delete all clicked");
                toast({
                  title: "Coming soon",
                  description: "This feature is under development.",
                });
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <>
                    <LoadingRow />
                    <LoadingRow />
                    <LoadingRow />
                  </>
                ) : (
                  <TableRow>
                    <TableCell>Property Manager</TableCell>
                    <TableCell>Monthly Statement Available</TableCell>
                    <TableCell>2024-02-05</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          disabled={isLoading}
                          onClick={() => {
                            logger.info("View message clicked");
                            toast({
                              title: "Coming soon",
                              description: "This feature is under development.",
                            });
                          }}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          disabled={isLoading}
                          onClick={() => handleArchive("1")}
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          disabled={isLoading}
                          onClick={() => handleDelete("1")}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Messages;