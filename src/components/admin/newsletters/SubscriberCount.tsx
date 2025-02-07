
import { Users } from "lucide-react";
import { NewsletterSubscriber } from "@/integrations/supabase/types/newsletter";

interface SubscriberCountProps {
  subscribers: NewsletterSubscriber[] | undefined;
}

export const SubscriberCount = ({ subscribers }: SubscriberCountProps) => {
  return (
    <div className="flex items-center gap-2">
      <Users className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        {subscribers?.length || 0} Active Subscribers
      </span>
    </div>
  );
};
