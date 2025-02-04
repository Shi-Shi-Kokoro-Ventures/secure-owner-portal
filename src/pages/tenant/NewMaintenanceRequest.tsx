import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

const NewMaintenanceRequest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Request Submitted",
        description: "Your maintenance request has been submitted successfully.",
      });
      
      navigate("/tenant/maintenance");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Validate file types and sizes
      const validFiles = Array.from(e.target.files).every(file => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!validTypes.includes(file.type)) {
          toast({
            title: "Invalid file type",
            description: "Please upload only images (JPEG, PNG, GIF) or PDF files.",
            variant: "destructive",
          });
          return false;
        }
        
        if (file.size > maxSize) {
          toast({
            title: "File too large",
            description: "Files must be less than 5MB in size.",
            variant: "destructive",
          });
          return false;
        }
        
        return true;
      });

      if (validFiles) {
        setFiles(e.target.files);
      } else {
        e.target.value = '';
        setFiles(null);
      }
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Submit Maintenance Request</h1>
        <p className="text-muted-foreground">
          Please provide details about the maintenance issue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Brief description of the issue"
            required
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="appliance">Appliance</SelectItem>
              <SelectItem value="structural">Structural</SelectItem>
              <SelectItem value="pest">Pest Control</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Please provide detailed information about the issue"
            required
            className="min-h-[150px]"
            maxLength={1000}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="attachments">Attachments</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Input
              id="attachments"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="attachments"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload files or drag and drop
              </span>
              <span className="text-xs text-muted-foreground">
                (Max file size: 5MB, Accepted formats: JPEG, PNG, GIF, PDF)
              </span>
            </label>
            {files && (
              <div className="mt-4 text-sm text-muted-foreground">
                {Array.from(files).map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/tenant/maintenance")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewMaintenanceRequest;