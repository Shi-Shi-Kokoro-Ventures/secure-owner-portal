import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Database } from "@/integrations/supabase/types";

type AudienceSelectorProps = {
  value: Database["public"]["Enums"]["announcement_audience"];
  onChange: (value: Database["public"]["Enums"]["announcement_audience"]) => void;
};

export const AudienceSelector = ({ value, onChange }: AudienceSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Target Audience</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all">All Users</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="tenants" id="tenants" />
          <Label htmlFor="tenants">Tenants Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="owners" id="owners" />
          <Label htmlFor="owners">Property Owners</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="property_managers" id="property_managers" />
          <Label htmlFor="property_managers">Property Managers</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="admins" id="admins" />
          <Label htmlFor="admins">Administrators</Label>
        </div>
      </RadioGroup>
    </div>
  );
};