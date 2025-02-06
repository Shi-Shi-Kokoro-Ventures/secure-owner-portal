
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const NewsletterGenerator = () => {
  const [topic, setTopic] = useState("");
  const [propertyUpdates, setPropertyUpdates] = useState("");
  const [includeMarketing, setIncludeMarketing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const propertyUpdatesList = propertyUpdates
        .split('\n')
        .filter(update => update.trim().length > 0);

      const { data, error } = await supabase.functions.invoke('generate-newsletter', {
        body: {
          topic,
          propertyUpdates: propertyUpdatesList,
          marketingContent: includeMarketing
        }
      });

      if (error) throw error;

      const { error: insertError } = await supabase
        .from('newsletters')
        .insert({
          title: data.title,
          content: data.content,
          status: 'draft',
          created_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Newsletter content has been generated and saved",
      });

      // Reset form
      setTopic("");
      setPropertyUpdates("");
      setIncludeMarketing(false);
    } catch (error) {
      console.error('Newsletter generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate newsletter content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="topic" className="text-sm font-medium">
          Main Topic
        </label>
        <Input
          id="topic"
          placeholder="Enter the main topic for the newsletter"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isGenerating}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="propertyUpdates" className="text-sm font-medium">
          Property Updates
        </label>
        <Textarea
          id="propertyUpdates"
          placeholder="Enter property updates (one per line)"
          value={propertyUpdates}
          onChange={(e) => setPropertyUpdates(e.target.value)}
          disabled={isGenerating}
          rows={4}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="marketing"
          checked={includeMarketing}
          onCheckedChange={(checked) => setIncludeMarketing(checked as boolean)}
          disabled={isGenerating}
        />
        <label
          htmlFor="marketing"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Include marketing content
        </label>
      </div>

      <Button type="submit" disabled={isGenerating || !topic}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Newsletter'
        )}
      </Button>
    </form>
  );
};
