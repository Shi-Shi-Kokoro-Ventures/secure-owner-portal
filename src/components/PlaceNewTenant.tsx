import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, DollarSign, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const PlaceNewTenant = () => {
  const { toast } = useToast();
  const [isNewTenant, setIsNewTenant] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Place Tenant",
      description: "Tenant placement functionality coming soon",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Place New Tenant</h1>
          <p className="text-sm text-muted-foreground">
            Properties / Sample Property / Place New Tenant
          </p>
        </div>
        <Button className="bg-[#0EA5E9]">
          Place Tenant
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A8DB7] p-4 text-white">
            <span>Tenant Information</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4">
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={isNewTenant}
                  onChange={() => setIsNewTenant(true)}
                  className="h-4 w-4"
                />
                Enter New Tenant
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!isNewTenant}
                  onChange={() => setIsNewTenant(false)}
                  className="h-4 w-4"
                />
                Use Existing Tenant
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Label>Company</Label>
                <Input placeholder="Company name" />
              </div>
              <div>
                <Label>First Name</Label>
                <Input placeholder="First name" />
              </div>
              <div className="w-20">
                <Label>MI</Label>
                <Input placeholder="MI" maxLength={1} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input placeholder="Last name" />
              </div>
              <div className="md:col-span-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="Email address" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A8DB7] p-4 text-white">
            <span>Rental Charges</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="flex items-center gap-1">
                  Rental Frequency
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <select className="w-full rounded-md border p-2">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Rental Amount
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input className="pl-8" placeholder="1250.00" />
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Security Deposit
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input className="pl-8" placeholder="1500.00" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="flex items-center gap-1">
                  Move-In Date
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Begin Charges On
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Lease-end Date
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="date" />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A8DB7] p-4 text-white">
            <span>Rental Options</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="flex items-center gap-1">
                  Pro-rate First Month
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <input type="checkbox" className="h-4 w-4" />
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Rent Charge Category
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <select className="w-full rounded-md border p-2">
                  <option>120 Rent</option>
                </select>
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Grace Period
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <div className="flex gap-2">
                  <Input type="number" defaultValue={0} />
                  <span className="flex items-center text-gray-500">days</span>
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  Create Invoice Early
                  <HelpCircle className="h-4 w-4" />
                </Label>
                <div className="flex gap-2">
                  <Input type="number" defaultValue={0} />
                  <span className="flex items-center text-gray-500">days</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A8DB7] p-4 text-white">
            <span>Automatic Rent Escalation</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              Enable Automatic Rent Escalation
            </label>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" className="bg-[#0EA5E9]">
            Place Tenant
          </Button>
        </div>
      </form>

      <div className="flex justify-between text-sm text-gray-500 pt-4 border-t">
        <div className="flex gap-4">
          <button className="hover:underline">Terms & Conditions</button>
          <button className="hover:underline">Knowledge Base</button>
          <button className="hover:underline">Refer a Friend</button>
        </div>
        <div>© 2008 - 2025 Rentec Direct, LLC</div>
      </div>
    </div>
  );
};