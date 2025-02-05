
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface UserHeaderProps {
  onAddUser: () => void;
}

export const UserHeader = ({ onAddUser }: UserHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">User Management</h1>
      <Button 
        className="bg-[#4C8DAE] hover:bg-[#3a7a9b]"
        onClick={onAddUser}
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>
  );
};
