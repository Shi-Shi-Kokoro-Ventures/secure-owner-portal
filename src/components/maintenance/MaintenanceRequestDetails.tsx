import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;

const MAINTENANCE_CATEGORIES = [
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'appliance', label: 'Appliance' },
  { value: 'structural', label: 'Structural' },
  { value: 'pest', label: 'Pest Control' },
  { value: 'other', label: 'Other' }
];

interface MaintenanceRequestDetailsProps {
  formData: {
    title: string;
    category: string;
    description: string;
  };
  setFormData: (data: any) => void;
  error: string | null;
}

export const MaintenanceRequestDetails = ({
  formData,
  setFormData,
  error
}: MaintenanceRequestDetailsProps) => {
  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Brief description of the issue"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            title: e.target.value.slice(0, MAX_TITLE_LENGTH)
          }))}
          required
          maxLength={MAX_TITLE_LENGTH}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.title.length}/{MAX_TITLE_LENGTH}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {MAINTENANCE_CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Please provide detailed information about the issue"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            description: e.target.value.slice(0, MAX_DESCRIPTION_LENGTH)
          }))}
          required
          className="min-h-[150px]"
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.description.length}/{MAX_DESCRIPTION_LENGTH}
        </p>
      </div>
    </>
  );
};