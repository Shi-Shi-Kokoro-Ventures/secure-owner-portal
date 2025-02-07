import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";

export const ComposeMessageDialog = () => {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!recipient || !subject || !content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      // First create a new conversation
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          type: 'tenant-manager',  // Changed from 'direct' to a valid type
          last_message: content,
          last_message_at: new Date().toISOString()
        })
        .select()
        .single();

      if (conversationError) throw conversationError;

      // Then create the message
      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationData.id,
            sender_id: (await supabase.auth.getUser()).data.user?.id,
            receiver_id: recipient, // Added receiver_id
            message_content: content,
            status: 'sent',
            message_type: 'text'
          }
        ]);

      if (messageError) throw messageError;

      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
      
      setOpen(false);
      setRecipient("");
      setSubject("");
      setContent("");
    } catch (error) {
      logger.error("Failed to send message", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          New Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Start a new conversation
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="recipient"
              placeholder="Recipient"
              className="col-span-4"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="subject"
              placeholder="Subject"
              className="col-span-4"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              id="content"
              placeholder="Message content"
              className="col-span-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSend} disabled={isSending}>
            {isSending ? "Sending..." : "Send message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};