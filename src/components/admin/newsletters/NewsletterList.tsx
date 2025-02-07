
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Mail, Pencil, Send, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Newsletter, NewsletterSubscriber } from "@/integrations/supabase/types/newsletter";
import { useState } from "react";

export const NewsletterList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddingSubscriber, setIsAddingSubscriber] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: newsletters, isLoading: isLoadingNewsletters } = useQuery({
    queryKey: ['newsletters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Newsletter[];
    },
  });

  const { data: subscribers, isLoading: isLoadingSubscribers } = useQuery({
    queryKey: ['newsletter_subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as NewsletterSubscriber[];
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('newsletters')
        .delete()
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['newsletters'] });

      toast({
        title: "Newsletter deleted",
        description: "The newsletter has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      toast({
        title: "Error",
        description: "Failed to delete newsletter. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSend = async (id: string) => {
    try {
      const { error } = await supabase
        .from('newsletters')
        .update({ 
          status: 'pending_review',
          scheduled_for: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['newsletters'] });

      toast({
        title: "Newsletter scheduled",
        description: "The newsletter has been scheduled for sending.",
      });
    } catch (error) {
      console.error('Error scheduling newsletter:', error);
      toast({
        title: "Error",
        description: "Failed to schedule newsletter. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddSubscriber = async (email: string) => {
    setIsAddingSubscriber(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { 
            email,
            status: 'active',
            unsubscribe_token: crypto.randomUUID()
          }
        ]);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['newsletter_subscribers'] });

      toast({
        title: "Subscriber added",
        description: "The subscriber has been successfully added.",
      });
      
      setDialogOpen(false);
    } catch (error) {
      console.error('Error adding subscriber:', error);
      toast({
        title: "Error",
        description: "Failed to add subscriber. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingSubscriber(false);
    }
  };

  if (isLoadingNewsletters || isLoadingSubscribers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {subscribers?.length || 0} Active Subscribers
          </span>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Add Subscriber
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subscriber</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement).email.value;
              handleAddSubscriber(email);
              (e.target as HTMLFormElement).reset();
            }}>
              <div className="space-y-4">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter subscriber email"
                  required
                  disabled={isAddingSubscriber}
                />
                <Button type="submit" className="w-full" disabled={isAddingSubscriber}>
                  {isAddingSubscriber ? "Adding..." : "Add Subscriber"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsletters?.map((newsletter) => (
              <TableRow key={newsletter.id}>
                <TableCell>{newsletter.title}</TableCell>
                <TableCell>
                  <Badge variant={
                    newsletter.status === 'draft' ? 'secondary' :
                    newsletter.status === 'pending_review' ? 'outline' :
                    newsletter.status === 'approved' ? 'default' :
                    newsletter.status === 'sent' ? 'default' : 'destructive'
                  }>
                    {newsletter.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(newsletter.created_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  {newsletter.scheduled_for 
                    ? format(new Date(newsletter.scheduled_for), 'MMM d, yyyy')
                    : 'Not scheduled'}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSend(newsletter.id)}
                    disabled={newsletter.status !== 'draft'}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={newsletter.status === 'sent'}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={newsletter.status === 'sent'}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(newsletter.id)}
                    disabled={newsletter.status === 'sent'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
