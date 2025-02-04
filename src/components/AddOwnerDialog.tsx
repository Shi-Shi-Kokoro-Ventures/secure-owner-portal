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
  }) => void;
}

export function AddOwnerDialog({ open, onOpenChange, onAddOwner }: AddOwnerDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newOwner = {
      name,
      email,
      properties: 0,
      balance: 0,
      lastPayment: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    onAddOwner(newOwner);
    setName("");
    setEmail("");
    onOpenChange(false);
    
    toast({
      title: "Success",
      description: "Owner added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Owner</DialogTitle>
          <DialogDescription>
            Enter the details of the new property owner.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
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