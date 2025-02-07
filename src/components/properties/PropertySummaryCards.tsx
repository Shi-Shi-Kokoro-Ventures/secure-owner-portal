
import { Building2, FileText, DollarSign, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";

export const PropertySummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <Card className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">1</p>
            <p className="text-sm opacity-90">Vacancy</p>
          </div>
          <Building2 className="h-8 w-8 opacity-80" />
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm opacity-90">Leases Expire Soon</p>
          </div>
          <FileText className="h-8 w-8 opacity-80" />
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-red-400 to-red-500 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm opacity-90">Rent Overdue</p>
          </div>
          <DollarSign className="h-8 w-8 opacity-80" />
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm opacity-90">Open Work Orders</p>
          </div>
          <Wrench className="h-8 w-8 opacity-80" />
        </div>
      </Card>
    </div>
  );
};
