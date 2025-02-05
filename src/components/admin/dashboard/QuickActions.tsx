
import { Building2, FileText, UserPlus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Button 
        variant="outline"
        className="group flex h-auto flex-col items-start gap-4 p-6 bg-white hover:bg-gray-50 border-gray-100"
        onClick={() => navigate('/admin/users')}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8FAFC]">
          <UserPlus className="h-5 w-5 text-[#64748B]" />
        </div>
        <div className="space-y-1">
          <div className="font-medium text-gray-900">Add Manager</div>
          <div className="text-sm text-[#64748B]">Create new property manager</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="group flex h-auto flex-col items-start gap-4 p-6 bg-white hover:bg-gray-50 border-gray-100"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8FAFC]">
          <FileText className="h-5 w-5 text-[#64748B]" />
        </div>
        <div className="space-y-1">
          <div className="font-medium text-gray-900">Review Leases</div>
          <div className="text-sm text-[#64748B]">3 leases pending review</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="group flex h-auto flex-col items-start gap-4 p-6 bg-white hover:bg-gray-50 border-gray-100"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8FAFC]">
          <Wrench className="h-5 w-5 text-[#64748B]" />
        </div>
        <div className="space-y-1">
          <div className="font-medium text-gray-900">Maintenance</div>
          <div className="text-sm text-[#64748B]">View maintenance requests</div>
        </div>
      </Button>

      <Button 
        variant="outline"
        className="group flex h-auto flex-col items-start gap-4 p-6 bg-white hover:bg-gray-50 border-gray-100"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8FAFC]">
          <Building2 className="h-5 w-5 text-[#64748B]" />
        </div>
        <div className="space-y-1">
          <div className="font-medium text-gray-900">Properties</div>
          <div className="text-sm text-[#64748B]">Manage properties</div>
        </div>
      </Button>
    </div>
  );
};
