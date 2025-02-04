import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PlaceNewTenant } from "./PlaceNewTenant";

export const PropertyDetails = () => {
  const { toast } = useToast();
  const [showPlaceNewTenant, setShowPlaceNewTenant] = useState(false);

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} functionality coming soon`,
    });
  };

  if (showPlaceNewTenant) {
    return <PlaceNewTenant />;
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="relative">
        <img
          src="/lovable-uploads/34b95799-1197-441e-8517-5798003a835a.png"
          alt="Sample Property"
          className="h-48 w-full rounded-lg object-cover"
        />
        <div className="absolute right-2 top-2">
          <button 
            className="rounded-full bg-white p-1 text-gray-600 hover:text-gray-900"
            onClick={() => handleAction('Property Options')}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Sample Property</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => handleAction('Post Income')}
          >
            Post Income
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => handleAction('Post Expense')}
          >
            Post Expense
          </Button>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <div className="text-gray-600">Address</div>
          <div>123 Sample Ave</div>
          <div>Sampleville, OR 97526</div>
        </div>

        <div>
          <div className="text-gray-600">Balance</div>
          <div>$0.00</div>
        </div>

        <div>
          <div className="text-gray-600">Description</div>
          <div>Just an example property.</div>
        </div>

        <div>
          <div className="text-gray-600">Tenant</div>
          <div className="flex items-center justify-between">
            <div className="text-red-600">Vacant</div>
            <Button 
              variant="link" 
              size="sm" 
              className="text-blue-600"
              onClick={() => setShowPlaceNewTenant(true)}
            >
              <Plus className="mr-1 h-4 w-4" />
              Place New Tenant
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-gray-600">Notes</div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleAction('Add Note')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-gray-500">No notes</div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-gray-600">Work Orders</div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleAction('Add Work Order')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-gray-500">No work orders</div>
        </div>

        <div>
          <div className="text-gray-600">Listed</div>
          <div>Not Listed</div>
        </div>

        <div>
          <div className="text-gray-600">Applications</div>
          <div>0 Unread</div>
        </div>

        <div>
          <div className="text-gray-600">Private Notes</div>
          <div className="text-gray-500">This is a sample property, feel free to delete it at any time.</div>
        </div>
      </div>
    </div>
  );
};
