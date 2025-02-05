import { useState } from "react";
import { Calendar, Clock, Pin, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "./RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AnnouncementDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState<string>("all");
  const [urgencyLevel, setUrgencyLevel] = useState<string>("low");
  const [isPinned, setIsPinned] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("system_announcements")
        .insert({
          title,
          message,
          audience,
          urgency_level: urgencyLevel,
          is_pinned: isPinned,
          is_scheduled: isScheduled,
          scheduled_time: isScheduled ? scheduledTime : null,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Announcement has been broadcast successfully",
      });
      
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error broadcasting announcement:", error);
      toast({
        title: "Error",
        description: "Failed to broadcast announcement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setAudience("all");
    setUrgencyLevel("low");
    setIsPinned(false);
    setIsScheduled(false);
    setScheduledTime("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Broadcast Announcement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Broadcast System Announcement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="tenants">Tenants Only</SelectItem>
                  <SelectItem value="owners">Owners Only</SelectItem>
                  <SelectItem value="property_managers">Property Managers Only</SelectItem>
                  <SelectItem value="admins">Admins Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Message</Label>
            <RichTextEditor value={message} onChange={setMessage} />
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className={`gap-2 ${isPinned ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setIsPinned(!isPinned)}
            >
              <Pin className="h-4 w-4" />
              {isPinned ? 'Pinned' : 'Pin Announcement'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className={`gap-2 ${isScheduled ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setIsScheduled(!isScheduled)}
            >
              <Calendar className="h-4 w-4" />
              {isScheduled ? 'Scheduled' : 'Schedule'}
            </Button>
          </div>

          {isScheduled && (
            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Schedule Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="scheduledTime"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Broadcasting..." : "Broadcast Announcement"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};