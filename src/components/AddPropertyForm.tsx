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
import { ChevronDown, HelpCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
              <div className="flex items-center gap-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter a nickname for this property</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input id="nickname" placeholder="Enter nickname" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="description">Description</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter a description for this property</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input id="description" placeholder="Enter description" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="address">Address</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the property address</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input id="address" placeholder="Enter a location" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">Zip</Label>
              <Input id="zip" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="private-notes">Private Notes</Label>
            <Input id="private-notes" className="h-24" />
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
            <div className="flex items-center gap-2">
              <Label htmlFor="multi-unit">Multi Unit Property</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Is this a multi-unit property?</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Checkbox id="multi-unit" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="units">How Many Units</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of units in this property</p>
                  </TooltipContent>
                </Tooltip>
              </div>
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
              <div className="flex items-center gap-2">
                <Label htmlFor="default-rent">Default Rent</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Default rent amount</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input id="default-rent" type="number" className="pl-6" defaultValue="0.00" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="default-security">Default Security</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Default security deposit amount</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input id="default-security" type="number" className="pl-6" defaultValue="0.00" />
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
              <div className="flex items-center gap-2">
                <Label htmlFor="property-manager">Property Manager</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the property manager</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Use Property Manager (default)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Use Property Manager (default)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="marketing-manager">Marketing Manager</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the marketing manager</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Use Property Manager (default)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Use Property Manager (default)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" size="sm">
              Live Expert Help
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#2B7094] p-3 text-white">
          <span>Financial</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="income-account">Income Account</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the income account</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="expense-account">Expense Account</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the expense account</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="payable-to">Payable To</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select who payments are payable to</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Property Manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Property Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="property-reserve">Property Reserve</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set the property reserve amount</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="property-reserve-enabled" />
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input type="number" className="pl-6" defaultValue="0.00" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="renters-insurance">Renter's Insurance Required</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select renter's insurance requirement</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="linked-asset">Linked Asset Account / Opening Balance</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set the linked asset account and opening balance</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="linked-asset-enabled" />
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5">$</span>
                <Input type="number" className="pl-6" defaultValue="0.00" />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#2B7094] p-3 text-white">
          <span>Fee Structure</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 px-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="category">Category</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the fee category</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="6100 Management Fees (Expense)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6100">6100 Management Fees (Expense)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="flat-rate">Flat Rate</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input id="flat-rate" type="number" className="pl-6" defaultValue="0.00" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">Percentage of Tenant Payments</Label>
              <div className="relative">
                <Input id="percentage" type="number" className="pr-6" defaultValue="0.0" />
                <span className="absolute right-3 top-2.5">%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="charged-rent">Percentage of Charged Rent</Label>
              <div className="relative">
                <Input id="charged-rent" type="number" className="pr-6" defaultValue="0.0" />
                <span className="absolute right-3 top-2.5">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="not-less">Not Less Than</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input id="not-less" type="number" className="pl-6" defaultValue="0.00" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="not-exceed">Not To Exceed</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Maximum fee amount</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input id="not-exceed" type="number" className="pl-6" defaultValue="0.00" />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#2B7094] p-3 text-white">
          <span>Placement Fees</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="placement-category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="6150 Commissions (Expense)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6150">6150 Commissions (Expense)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="placement-fee">Placement Fee</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set the placement fee amount</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="placement-fee-enabled" />
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5">$</span>
                <Input type="number" className="pl-6" defaultValue="0.00" />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#2B7094] p-3 text-white">
          <span>Custom Info</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 px-4">
          <div className="flex justify-end space-x-4">
            <Button variant="outline" size="sm">
              Add Custom Fields
            </Button>
            <Button variant="outline" size="sm">
              Manage Custom Fields
            </Button>
          </div>
          <div className="text-center text-gray-500">
            No custom fields found for this record.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex justify-between space-x-4">
        <div className="flex space-x-4 text-sm text-blue-600">
          <Button variant="link" className="p-0">Terms & Conditions</Button>
          <span>|</span>
          <Button variant="link" className="p-0">Knowledge Base</Button>
          <span>|</span>
          <Button variant="link" className="p-0">Refer a Friend</Button>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Add Property</Button>
        </div>
      </div>
    </form>
  );
};