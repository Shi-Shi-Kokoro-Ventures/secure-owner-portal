
import { Button } from "@/components/ui/button";
import { Archive, MessageCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

interface MessageActionsProps {
  onArchive: () => void;
  onDelete: () => void;
  onReply: (message: string) => void;
  isReplying: boolean;
}

export const MessageActions = ({ onArchive, onDelete, onReply, isReplying }: MessageActionsProps) => {
  const [replyMessage, setReplyMessage] = useState("");

  const handleReply = () => {
    onReply(replyMessage);
    setReplyMessage("");
  };

  return (
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
                disabled={isReplying}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {isReplying ? "Sending..." : "Send Reply"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant="outline"
        className="gap-2"
        onClick={onArchive}
      >
        <Archive className="h-4 w-4" />
        Archive
      </Button>
      <Button
        variant="destructive"
        className="gap-2"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};
