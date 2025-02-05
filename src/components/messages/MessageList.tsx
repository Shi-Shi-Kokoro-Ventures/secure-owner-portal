import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Archive, Mail, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

interface Message {
  id: string;
  from: string;
  subject: string;
  date: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const MessageList = ({ messages, isLoading, onArchive, onDelete, onView }: MessageListProps) => {
  const LoadingRow = () => (
    <TableRow>
      <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
      <TableCell><Skeleton className="h-4 w-[300px]" /></TableCell>
      <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
      <TableCell><Skeleton className="h-8 w-[120px]" /></TableCell>
    </TableRow>
  );

  return (
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
          ) : messages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No messages found
              </TableCell>
            </TableRow>
          ) : (
            messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.from}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onView(message.id)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onArchive(message.id)}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDelete(message.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};