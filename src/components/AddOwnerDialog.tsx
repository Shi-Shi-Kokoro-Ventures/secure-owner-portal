import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddOwnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddOwner: (owner: {
    name: string;
    email: string;
    properties: number;
    balance: number;
    lastPayment: string;
    status: string;
    username?: string;
    dateOfBirth?: string;
    phone?: string;
    address?: string;
    mailingAddress?: string;
    governmentId?: string;
    taxId?: string;
    ownershipType?: string;
    bankAccount?: string;
    billingAddress?: string;
    communicationPreference?: string;
    timezone?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    emergencyContactRelation?: string;
    notes?: string;
  }) => void;
}

export function AddOwnerDialog({ open, onOpenChange, onAddOwner }: AddOwnerDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    mailingAddress: "",
    governmentId: "",
    taxId: "",
    ownershipType: "individual",
    bankAccount: "",
    billingAddress: "",
    communicationPreference: "email",
    timezone: "UTC",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    notes: "",
  });

  const { toast } = useToast();

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newOwner = {
      ...formData,
      properties: 0,
      balance: 0,
      lastPayment: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    onAddOwner(newOwner);
    setFormData({
      name: "",
      email: "",
      username: "",
      dateOfBirth: "",
      phone: "",
      address: "",
      mailingAddress: "",
      governmentId: "",
      taxId: "",
      ownershipType: "individual",
      bankAccount: "",
      billingAddress: "",
      communicationPreference: "email",
      timezone: "UTC",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      notes: "",
    });
    onOpenChange(false);
    
    toast({
      title: "Success",
      description: "Owner added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Owner</DialogTitle>
          <DialogDescription>
            Enter the details of the new property owner. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange("name")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleChange("username")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Physical Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleChange("address")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mailingAddress">Mailing Address (if different)</Label>
              <Input
                id="mailingAddress"
                value={formData.mailingAddress}
                onChange={handleChange("mailingAddress")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="governmentId">Government ID</Label>
                <Input
                  id="governmentId"
                  value={formData.governmentId}
                  onChange={handleChange("governmentId")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={handleChange("taxId")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownershipType">Ownership Type</Label>
                <Select
                  value={formData.ownershipType}
                  onValueChange={handleSelectChange("ownershipType")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="joint">Joint</SelectItem>
                    <SelectItem value="corporate">Corporate/LLC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="communicationPreference">Communication Preference</Label>
                <Select
                  value={formData.communicationPreference}
                  onValueChange={handleSelectChange("communicationPreference")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="mail">Mail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Emergency Contact Information</Label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="Name"
                  value={formData.emergencyContactName}
                  onChange={handleChange("emergencyContactName")}
                />
                <Input
                  placeholder="Phone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange("emergencyContactPhone")}
                />
                <Input
                  placeholder="Relationship"
                  value={formData.emergencyContactRelation}
                  onChange={handleChange("emergencyContactRelation")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={handleChange("notes")}
                placeholder="Enter any additional information or special instructions..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Owner</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}