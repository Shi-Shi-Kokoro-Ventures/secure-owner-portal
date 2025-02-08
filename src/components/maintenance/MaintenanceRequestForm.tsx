
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MaintenanceRequestFiles } from "./MaintenanceRequestFiles";
import { MaintenanceRequestDetails } from "./MaintenanceRequestDetails";
import { MaintenanceCategory } from "./MaintenanceRequestDetails";

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
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Request Submitted",
        description: "Your maintenance request has been submitted successfully.",
      });
      
      navigate("/tenant/maintenance");
    } catch (err) {
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
