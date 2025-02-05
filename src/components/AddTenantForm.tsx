import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const AddTenantForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Add Tenant",
      description: "Tenant creation functionality coming soon",
    });
  };

  const handleCancel = () => {
    navigate("/tenants");
  };

  const handleLoginAsTenant = () => {
    toast({
      title: "Login as Tenant",
      description: "Tenant impersonation functionality coming soon",
    });
  };

  const handleManageCustomFields = () => {
    toast({
      title: "Custom Fields",
      description: "Custom fields management coming soon",
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">New Tenant</h1>
          <p className="text-muted-foreground">Tenants / New Tenant</p>
        </div>
        <Button 
          variant="default" 
          className="bg-[#0072bc] hover:bg-[#005a96]"
          onClick={handleSubmit}
        >
          Add Tenant
        </Button>
      </div>

      <div className="space-y-4">
        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-[#4B7797] text-white rounded-t-md">
            <span className="font-semibold">Tenant Details</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Company</label>
                <Input />
              </div>
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <Input />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <Input />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm mb-1">Date of Birth</label>
                <div className="relative">
                  <Input placeholder="mm/dd/yyyy" />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">SSN</label>
                <Input />
              </div>
              <div>
                <label className="block text-sm mb-1">License</label>
                <Input />
              </div>
              <div>
                <label className="block text-sm mb-1">Employer</label>
                <Input />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Private Notes</label>
              <Textarea className="min-h-[100px]" />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-[#4B7797] text-white rounded-t-md">
            <span className="font-semibold">Contact Info</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Checkbox id="email-notifications" />
              <label htmlFor="email-notifications">Email Notifications</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <Input />
              </div>
              <div>
                <label className="block text-sm mb-1">Mobile Phone</label>
                <Input />
              </div>
              <div>
                <label className="block text-sm mb-1">Mailing Address</label>
                <Input />
              </div>
              <div>
                <label className="block text-sm mb-1">Work Phone</label>
                <Input />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-[#4B7797] text-white rounded-t-md">
            <span className="font-semibold">Tenant Portal</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Checkbox id="portal-access" />
              <label htmlFor="portal-access" className="flex items-center gap-1">
                Tenant Portal Access
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Enable tenant portal access
                  </TooltipContent>
                </Tooltip>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-500">- not set up -</div>
              <Button 
                variant="secondary" 
                className="bg-[#6B4E9D] text-white hover:bg-[#5a417f]"
                onClick={handleLoginAsTenant}
              >
                Log in as Tenant
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-[#4B7797] text-white rounded-t-md">
            <span className="font-semibold">Accounting Defaults</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Rent Charge</label>
                <Input placeholder="set at move-in" disabled className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm mb-1">Late Fees</label>
                <div className="text-gray-500 italic">Using Defaults</div>
              </div>
              <div>
                <label className="block text-sm mb-1">Create Invoice</label>
                <div className="flex items-center gap-2">
                  <Input className="w-20" defaultValue="0" />
                  <span>days before due</span>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Grace Period (days)</label>
                <Input className="w-20" defaultValue="0" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen className="border rounded-md">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-[#4B7797] text-white rounded-t-md">
            <span className="font-semibold">Custom Fields</span>
            <HelpCircle className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <div className="text-center text-gray-500 py-4">
              No custom fields found for this record.
            </div>
            <div className="flex justify-center">
              <Button 
                variant="secondary"
                onClick={handleManageCustomFields}
              >
                Manage Custom Fields
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="space-x-4 text-sm text-[#0072bc]">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:underline">Knowledge Base</a>
            <span>|</span>
            <a href="#" className="hover:underline">Refer a Friend</a>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button 
              className="bg-[#0072bc] hover:bg-[#005a96]"
              onClick={handleSubmit}
            >
              Add Tenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};