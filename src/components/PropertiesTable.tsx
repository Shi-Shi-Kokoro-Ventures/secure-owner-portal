import { Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PropertiesTable = () => {
  const { toast } = useToast();

  const handlePagination = (action: string) => {
    toast({
      title: "Pagination",
      description: `${action} page functionality coming soon`,
    });
  };

  return (
    <div className="rounded-md border">
      <div className="bg-[#4A8DB7] text-white">
        <div className="grid grid-cols-3 px-4 py-3">
          <div>Property</div>
          <div>Tenant</div>
          <div>Balance</div>
        </div>
      </div>
      <div className="divide-y">
        <div className="grid grid-cols-3 items-center px-4 py-3 hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-md">
              <img 
                src="/lovable-uploads/34b95799-1197-441e-8517-5798003a835a.png" 
                alt="Sample Property"
                className="h-full w-full object-cover"
              />
            </div>
            <div>Sample Property</div>
          </div>
          <div className="text-red-600">Vacant</div>
          <div>$0.00</div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 text-sm">
        <div>Showing 1 to 1 of 1 entries</div>
        <div className="flex gap-2">
          <button 
            className="rounded bg-gray-200 px-3 py-1" 
            disabled
            onClick={() => handlePagination('Previous')}
          >
            Previous
          </button>
          <button 
            className="rounded bg-blue-600 px-3 py-1 text-white"
            onClick={() => handlePagination('Current')}
          >
            1
          </button>
          <button 
            className="rounded bg-gray-200 px-3 py-1" 
            disabled
            onClick={() => handlePagination('Next')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};