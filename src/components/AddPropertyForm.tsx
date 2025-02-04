import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export const AddPropertyForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Property Added",
      description: "Property has been successfully added",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Collapsible defaultOpen className="space-y-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#2B7094] p-3 text-white">
          <span>Property Identification</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input id="nickname" placeholder="Enter nickname" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter description" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter a location" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="private-notes">Private Notes</Label>
            <Input id="private-notes" />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#2B7094] p-3 text-white">
          <span>Rental Details</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="multi-unit">Multi Unit Property</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="units">How Many Units</Label>
              <Input id="units" type="number" defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Single-Family Home" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single-Family Home</SelectItem>
                  <SelectItem value="multi">Multi-Family</SelectItem>
                  <SelectItem value="condo">Condo/Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-rent">Default Rent</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input id="default-rent" type="number" className="pl-6" defaultValue="0.00" />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#2B7094] p-3 text-white">
          <span>Managers & Owners</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="property-manager">Property Manager</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Property Manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Use Property Manager (default)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="marketing-manager">Marketing Manager</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Marketing Manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Use Property Manager (default)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit">Add Property</Button>
      </div>
    </form>
  );
};