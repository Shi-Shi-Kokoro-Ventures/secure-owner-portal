
import { Calendar, Mail, Pencil, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/integrations/supabase/types/newsletter";

interface NewsletterActionsProps {
  newsletter: Newsletter;
  onSend: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const NewsletterActions = ({ newsletter, onSend, onDelete }: NewsletterActionsProps) => {
  return (
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSend(newsletter.id)}
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
        onClick={() => onDelete(newsletter.id)}
        disabled={newsletter.status === 'sent'}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
