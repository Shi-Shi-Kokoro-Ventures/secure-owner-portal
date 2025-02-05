import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AnnouncementListener = () => {
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('system-announcements')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'system_announcements'
        },
        (payload) => {
          const announcement = payload.new;
          toast({
            title: announcement.title,
            description: announcement.message.replace(/<[^>]*>/g, ''),
            variant: announcement.urgency_level === 'critical' ? 'destructive' : 'default',
            duration: announcement.urgency_level === 'critical' ? 10000 : 5000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return null;
};