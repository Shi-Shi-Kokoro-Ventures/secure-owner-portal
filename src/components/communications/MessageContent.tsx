
import { MessageCircle } from "lucide-react";

interface MessageContentProps {
  content: string;
  sender: {
    first_name: string;
    last_name: string;
  };
  createdAt: string;
  status: string;
}

export const MessageContent = ({ content, sender, createdAt, status }: MessageContentProps) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border">
      <div>
        <h1 className="text-2xl font-bold">{content.substring(0, 50)}...</h1>
        <div className="flex items-center gap-4 text-muted-foreground mt-2">
          <span>From: {sender.first_name} {sender.last_name}</span>
          <span>Date: {new Date(createdAt).toLocaleDateString()}</span>
          {status !== "read" && (
            <span className="flex items-center gap-1 text-blue-500">
              <MessageCircle className="h-4 w-4" />
              Unread
            </span>
          )}
        </div>
      </div>

      <div className="prose max-w-none">
        <p>{content}</p>
      </div>
    </div>
  );
};
