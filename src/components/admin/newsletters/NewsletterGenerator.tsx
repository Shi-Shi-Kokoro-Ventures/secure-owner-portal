
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

export const NewsletterGenerator = () => {
  const [topic, setTopic] = useState("");
  const [propertyUpdates, setPropertyUpdates] = useState("");
  const [includeMarketing, setIncludeMarketing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('newsletter_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('newsletter_files')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

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

      let fileUrl = null;
      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile);
      }

      const { error: insertError } = await supabase
        .from('newsletters')
        .insert({
          title: data.title,
          content: data.content,
          status: 'draft',
          created_by: (await supabase.auth.getUser()).data.user?.id,
          canva_design_id: fileUrl
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
      setSelectedFile(null);
      setContent("");
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
    <ScrollArea className="h-[600px]">
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

        <div className="space-y-2">
          <label htmlFor="file" className="text-sm font-medium block">
            Attachment (optional)
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              disabled={isGenerating}
              className="max-w-md"
            />
            {selectedFile && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                Clear
              </Button>
            )}
          </div>
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

        <Button type="submit" disabled={isGenerating || !topic} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Generate Newsletter
            </>
          )}
        </Button>

        {content && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Generated Content Preview</h3>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </form>
    </ScrollArea>
  );
};
