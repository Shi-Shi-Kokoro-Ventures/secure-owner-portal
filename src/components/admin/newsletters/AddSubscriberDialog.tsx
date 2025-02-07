
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const AddSubscriberDialog = () => {
  const [isAddingSubscriber, setIsAddingSubscriber] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  return (
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
  );
};
