import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pin, AlertCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

type Announcement = {
  id: string;
  title: string;
  message: string;
  audience: 'all' | 'tenants' | 'owners' | 'property_managers' | 'admins';
  urgency_level: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  is_pinned: boolean;
  is_scheduled: boolean;
  scheduled_time: string | null;
};

export const AnnouncementList = () => {
  const { toast } = useToast();

  const { data: announcements, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_announcements')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        logger.error("Failed to fetch announcements", error);
        toast({
          title: "Error",
          description: "Failed to load announcements",
          variant: "destructive",
        });
        throw error;
      }

      return data as Announcement[];
    },
  });

  const getUrgencyColor = (level: Announcement['urgency_level']) => {
    switch (level) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-32" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements?.map((announcement) => (
        <Card key={announcement.id} className="group hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  {announcement.title}
                  {announcement.is_pinned && (
                    <Pin className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">
                    {announcement.audience}
                  </Badge>
                  <Badge className={getUrgencyColor(announcement.urgency_level)}>
                    {announcement.urgency_level}
                  </Badge>
                  {announcement.is_scheduled && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        Scheduled for {format(new Date(announcement.scheduled_time!), 'PPp')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {announcement.urgency_level === 'critical' && (
                <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: announcement.message }}
            />
            <div className="mt-2 text-sm text-muted-foreground">
              Posted {format(new Date(announcement.created_at), 'PPp')}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};