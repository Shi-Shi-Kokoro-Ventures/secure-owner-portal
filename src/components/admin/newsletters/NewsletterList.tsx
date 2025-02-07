
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Newsletter, NewsletterSubscriber } from "@/integrations/supabase/types/newsletter";
import { SubscriberCount } from "./SubscriberCount";
import { AddSubscriberDialog } from "./AddSubscriberDialog";
import { NewsletterActions } from "./NewsletterActions";

export const NewsletterList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  if (isLoadingNewsletters || isLoadingSubscribers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SubscriberCount subscribers={subscribers} />
        <AddSubscriberDialog />
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
                <TableCell>
                  <NewsletterActions
                    newsletter={newsletter}
                    onSend={handleSend}
                    onDelete={handleDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
