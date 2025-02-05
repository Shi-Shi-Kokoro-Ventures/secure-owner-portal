import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type AnnouncementPreviewProps = {
  title: string;
  message: string;
  urgencyLevel: Database["public"]["Enums"]["announcement_urgency"];
};

export const AnnouncementPreview = ({ title, message, urgencyLevel }: AnnouncementPreviewProps) => {
  const getUrgencyColor = (level: Database["public"]["Enums"]["announcement_urgency"]) => {
    switch (level) {
      case "critical":
        return "bg-destructive/10 border-destructive/20";
      case "high":
        return "bg-orange-500/10 border-orange-500/20";
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/20";
      default:
        return "bg-muted/50 border-muted";
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Preview</h4>
      <Card className={`${getUrgencyColor(urgencyLevel)} border`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </CardContent>
      </Card>
    </div>
  );
};