import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

interface MaintenanceRequestFilesProps {
  formData: {
    files: File[];
  };
  setFormData: (data: any) => void;
  setError: (error: string | null) => void;
}

export const MaintenanceRequestFiles = ({
  formData,
  setFormData,
  setError
}: MaintenanceRequestFilesProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const invalidFiles = selectedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} exceeds 5MB size limit`);
        return true;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError(`${file.name} is not a supported file type`);
        return true;
      }
      return false;
    });

    if (invalidFiles.length === 0) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...selectedFiles]
      }));
      setError(null);
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="attachments">Attachments</Label>
      <div className="border-2 border-dashed rounded-lg p-6">
        <Input
          id="attachments"
          type="file"
          multiple
          accept={ALLOWED_FILE_TYPES.join(',')}
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
            Max file size: 5MB. Accepted formats: JPEG, PNG, GIF, PDF
          </span>
        </label>

        {formData.files.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};