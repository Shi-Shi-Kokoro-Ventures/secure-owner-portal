import { useQuery } from "@tanstack/react-query";
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
import { Mail, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Newsletter } from "@/integrations/supabase/types/newsletter";

export const NewsletterList = () => {
  const { toast } = useToast();

  const { data: newsletters, isLoading } = useQuery({
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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('newsletters')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
        .update({ status: 'pending_review' })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Newsletter submitted",
        description: "The newsletter has been submitted for review.",
      });
    } catch (error) {
      console.error('Error updating newsletter:', error);
      toast({
        title: "Error",
        description: "Failed to submit newsletter. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading newsletters...</div>;
  }

  return (
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
                  <Mail className="h-4 w-4" />
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
  );
};