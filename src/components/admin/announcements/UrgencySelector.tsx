import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Database } from "@/integrations/supabase/types";

type UrgencySelectorProps = {
  value: Database["public"]["Enums"]["announcement_urgency"];
  onChange: (value: Database["public"]["Enums"]["announcement_urgency"]) => void;
};

export const UrgencySelector = ({ value, onChange }: UrgencySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Urgency Level</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="low" />
          <Label htmlFor="low">Low</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="high" />
          <Label htmlFor="high">High</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="critical" id="critical" />
          <Label htmlFor="critical">Critical</Label>
        </div>
      </RadioGroup>
    </div>
  );
};