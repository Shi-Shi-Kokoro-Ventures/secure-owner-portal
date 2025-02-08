
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MaintenanceRequestFiles } from "./MaintenanceRequestFiles";
import { MaintenanceRequestDetails } from "./MaintenanceRequestDetails";
import { MaintenanceCategory } from "./MaintenanceRequestDetails";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";

interface MaintenanceRequest {
  title: string;
  category: MaintenanceCategory;
  description: string;
  files: File[];
}

export const MaintenanceRequestForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<MaintenanceRequest>({
    title: '',
    category: 'plumbing',
    description: '',
    files: []
  });

  const handleMaintenanceDetailsChange = (data: Omit<MaintenanceRequest, 'files'>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleFilesChange = (data: { files: File[] }) => {
    setFormData(prev => ({
      ...prev,
      files: data.files
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      setIsSubmitting(false);
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) throw new Error("No authenticated user found");

      // Create the maintenance request
      const { data: request, error: requestError } = await supabase
        .from('maintenance_requests')
        .insert({
          tenant_id: user.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          status: 'pending',
          priority: 'medium'
        })
        .select()
        .single();

      if (requestError) throw requestError;

      // Upload files if any using Promise.allSettled for better error handling
      if (formData.files.length > 0) {
        const uploadPromises = formData.files.map(async (file) => {
          const parts = file.name.split('.');
          const fileExt = parts.length > 1 ? parts.pop() : null;
          
          if (!fileExt) {
            throw new Error(`File ${file.name} does not have a valid extension.`);
          }
          
          const fileName = `${crypto.randomUUID()}.${fileExt}`;
          const filePath = `maintenance/${request.id}/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('maintenance-files')
            .upload(filePath, file);
          
          if (uploadError) {
            throw new Error(`Upload failed for ${file.name}: ${uploadError.message}`);
          }
          
          return { filePath, fileName: file.name };
        });

        const results = await Promise.allSettled(uploadPromises);

        const successfulUploads = results.filter(
          (result): result is PromiseFulfilledResult<{ filePath: string; fileName: string }> => 
          result.status === 'fulfilled'
        );
        const failedUploads = results.filter(result => result.status === 'rejected');

        if (failedUploads.length > 0) {
          logger.error('Some files failed to upload:', failedUploads);
          toast({
            title: "Warning",
            description: `${successfulUploads.length} files uploaded successfully, ${failedUploads.length} files failed.`,
            variant: "destructive",
          });
        }

        if (successfulUploads.length > 0) {
          logger.info('Successfully uploaded files:', 
            successfulUploads.map(result => result.value.fileName)
          );
        }
      }
      
      toast({
        title: "Request Submitted",
        description: "Your maintenance request has been submitted successfully.",
      });
      
      navigate("/tenant/maintenance");
    } catch (err) {
      logger.error('Error submitting maintenance request:', err);
      setError("Failed to submit maintenance request. Please try again.");
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/tenant/maintenance");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <MaintenanceRequestDetails
        formData={formData}
        setFormData={handleMaintenanceDetailsChange}
        error={error}
      />
      
      <MaintenanceRequestFiles
        formData={formData}
        setFormData={handleFilesChange}
        setError={setError}
      />

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Request'
          )}
        </Button>
      </div>
    </form>
  );
};
