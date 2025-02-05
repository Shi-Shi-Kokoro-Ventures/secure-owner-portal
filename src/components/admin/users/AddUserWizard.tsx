
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, AlertCircle } from "lucide-react";
import type { UserFormState } from "@/types/user";

interface AddUserWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: UserFormState) => void;
}

const INITIAL_FORM_STATE: UserFormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "tenant",
  date_of_birth: "",
  ssn_last_four: "",
  government_id: null,
  street_address: "",
  city: "",
  state: "",
  zip_code: "",
  company_name: "",
  vendor_type: null,
  assigned_properties: [],
  emergency_contact_name: "",
  emergency_contact_phone: "",
  two_factor_enabled: false,
  status: "pending_approval",
  temporary_password: "",
};

export const AddUserWizard = ({ open, onOpenChange, onSubmit }: AddUserWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserFormState>(INITIAL_FORM_STATE);

  const updateFormData = (field: keyof UserFormState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderBasicInformation = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => updateFormData("first_name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => updateFormData("last_name", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value: any) => updateFormData("role", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="property_manager">Property Manager</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="tenant">Tenant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderLegalInformation = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.date_of_birth && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date_of_birth ? format(new Date(formData.date_of_birth), "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.date_of_birth ? new Date(formData.date_of_birth) : undefined}
              onSelect={(date) => updateFormData("date_of_birth", date?.toISOString())}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {formData.role === "tenant" && (
        <div className="space-y-2">
          <Label htmlFor="ssn">Last 4 Digits of SSN/ITIN</Label>
          <Input
            id="ssn"
            maxLength={4}
            value={formData.ssn_last_four}
            onChange={(e) => updateFormData("ssn_last_four", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">Required for background/credit checks</p>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="government_id">Government ID Upload</Label>
        <Input
          id="government_id"
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => updateFormData("government_id", e.target.files?.[0])}
        />
        <p className="text-sm text-muted-foreground">Upload driver's license, passport, or state-issued ID</p>
      </div>
    </div>
  );

  const renderAddressInformation = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="street_address">Street Address</Label>
        <Input
          id="street_address"
          value={formData.street_address}
          onChange={(e) => updateFormData("street_address", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData("city", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => updateFormData("state", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="zip_code">ZIP Code</Label>
        <Input
          id="zip_code"
          value={formData.zip_code}
          onChange={(e) => updateFormData("zip_code", e.target.value)}
        />
      </div>
    </div>
  );

  const renderRoleSpecificInformation = () => (
    <div className="space-y-4">
      {formData.role === "vendor" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => updateFormData("company_name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendor_type">Vendor Type</Label>
            <Select
              value={formData.vendor_type || ""}
              onValueChange={(value) => updateFormData("vendor_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vendor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="general_maintenance">General Maintenance</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="landscaping">Landscaping</SelectItem>
                <SelectItem value="pest_control">Pest Control</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );

  const renderEmergencyContact = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
        <Input
          id="emergency_contact_name"
          value={formData.emergency_contact_name}
          onChange={(e) => updateFormData("emergency_contact_name", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
        <Input
          id="emergency_contact_phone"
          value={formData.emergency_contact_phone}
          onChange={(e) => updateFormData("emergency_contact_phone", e.target.value)}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="status">User Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: any) => updateFormData("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending_approval">Pending Approval</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="checkbox"
          id="two_factor_enabled"
          checked={formData.two_factor_enabled}
          onChange={(e) => updateFormData("two_factor_enabled", e.target.checked)}
          className="w-4 h-4"
        />
        <Label htmlFor="two_factor_enabled">Enable Two-Factor Authentication</Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="temporary_password">Temporary Password</Label>
        <Input
          id="temporary_password"
          type="text"
          value={formData.temporary_password}
          onChange={(e) => updateFormData("temporary_password", e.target.value)}
        />
        <p className="text-sm text-muted-foreground">User will be required to change this on first login</p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInformation();
      case 2:
        return renderLegalInformation();
      case 3:
        return renderAddressInformation();
      case 4:
        return renderRoleSpecificInformation();
      case 5:
        return renderEmergencyContact();
      case 6:
        return renderSecuritySettings();
      default:
        return null;
    }
  };

  const renderStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information";
      case 2:
        return "Legal Information";
      case 3:
        return "Address Information";
      case 4:
        return "Role-Specific Information";
      case 5:
        return "Emergency Contact";
      case 6:
        return "Security Settings";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Add New User</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of 6
            </span>
          </DialogTitle>
        </DialogHeader>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{renderStepTitle()}</h3>
          {renderStepContent()}
        </Card>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              {currentStep < 6 ? (
                <Button onClick={handleNextStep}>Next</Button>
              ) : (
                <Button onClick={handleSubmit}>Create User</Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
