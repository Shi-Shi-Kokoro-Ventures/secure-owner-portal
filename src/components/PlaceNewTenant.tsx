import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ChevronDown, HelpCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export const PlaceNewTenant = () => {
  const { toast } = useToast();
  const [isNewTenant, setIsNewTenant] = useState(true);

  const handleSubmit = () => {
    toast({
      title: "Place Tenant",
      description: "Tenant placement functionality coming soon",
    });
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Place New Tenant</h1>
          <p className="text-sm text-muted-foreground">
            Properties / Sample Property / Place New Tenant
          </p>
        </div>
        <Button 
          onClick={handleSubmit}
          className="bg-[#0EA5E9] hover:bg-[#0284C7]"
        >
          Place Tenant
        </Button>
      </div>

      <div className="space-y-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A8DB7] p-4 text-white rounded-t-md">
            <span className="font-medium">Tenant Information</span>
            <ChevronDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="border border-t-0 p-6 space-y-6 rounded-b-md">
            <div className="flex gap-6">
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
                <label className="block text-sm mb-1">Company</label>
                <Input placeholder="Company name" />
              </div>
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <Input placeholder="First name" />
              </div>
              <div>
                <label className="block text-sm mb-1">MI</label>
                <Input placeholder="MI" maxLength={1} className="w-16" />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <Input placeholder="Last name" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Email Address</label>
                <Input type="email" placeholder="Email address" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A8DB7] p-4 text-white rounded-t-md">
            <span className="font-medium">Rental Charges</span>
            <ChevronDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="border border-t-0 p-6 space-y-6 rounded-b-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Rental Frequency
                  <HelpCircle className="h-4 w-4" />
                </label>
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Rental Amount
                  <HelpCircle className="h-4 w-4" />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input className="pl-7" placeholder="1250.00" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Security Deposit
                  <HelpCircle className="h-4 w-4" />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input className="pl-7" placeholder="1500.00" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Move-In Date
                  <HelpCircle className="h-4 w-4" />
                </label>
                <div className="relative">
                  <Input type="date" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Begin Charges On
                  <HelpCircle className="h-4 w-4" />
                </label>
                <div className="relative">
                  <Input type="date" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Lease-end Date
                  <HelpCircle className="h-4 w-4" />
                </label>
                <div className="relative">
                  <Input type="date" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A8DB7] p-4 text-white rounded-t-md">
            <span className="font-medium">Rental Options</span>
            <ChevronDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="border border-t-0 p-6 space-y-6 rounded-b-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Pro-rate First Month
                  <HelpCircle className="h-4 w-4" />
                </label>
                <Checkbox />
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Rent Charge Category
                  <HelpCircle className="h-4 w-4" />
                </label>
                <Select defaultValue="120">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="120">120 Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Grace Period
                  <HelpCircle className="h-4 w-4" />
                </label>
                <div className="flex gap-2 items-center">
                  <Input type="number" defaultValue={0} className="w-20" />
                  <span className="text-gray-500">days</span>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm mb-1">
                  Create Invoice Early
                  <HelpCircle className="h-4 w-4" />
                </label>
                <div className="flex gap-2 items-center">
                  <Input type="number" defaultValue={0} className="w-20" />
                  <span className="text-gray-500">days</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A8DB7] p-4 text-white rounded-t-md">
            <span className="font-medium">Automatic Rent Escalation</span>
            <ChevronDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="border border-t-0 p-6 rounded-b-md">
            <label className="flex items-center gap-2">
              <Checkbox />
              Enable Automatic Rent Escalation
            </label>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button 
          onClick={handleSubmit}
          className="bg-[#0EA5E9] hover:bg-[#0284C7]"
        >
          Place Tenant
        </Button>
      </div>

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