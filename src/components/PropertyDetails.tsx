import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const PropertyDetails = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} functionality coming soon`,
    });
  };

  return (
    <div className="group relative space-y-6 overflow-hidden rounded-xl border bg-gradient-to-b from-white to-gray-50/50 p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:from-gray-900 dark:to-gray-900/50">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
        <img
          src="/lovable-uploads/34b95799-1197-441e-8517-5798003a835a.png"
          alt="Sample Property"
          className="h-56 w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition-all duration-300 hover:bg-white hover:text-gray-900 hover:shadow-md"
          onClick={() => handleAction('Property Options')}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Sample Property</h2>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "bg-emerald-600 text-white transition-colors duration-300",
              "hover:bg-emerald-700 hover:text-white",
              "dark:bg-emerald-600/90 dark:hover:bg-emerald-600"
            )}
            onClick={() => handleAction('Post Income')}
          >
            Post Income
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "bg-rose-600 text-white transition-colors duration-300",
              "hover:bg-rose-700 hover:text-white",
              "dark:bg-rose-600/90 dark:hover:bg-rose-600"
            )}
            onClick={() => handleAction('Post Expense')}
          >
            Post Expense
          </Button>
        </div>
      </div>

      <div className="grid gap-6 text-sm sm:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</div>
          <div className="font-medium text-gray-900 dark:text-gray-100">123 Sample Ave</div>
          <div className="text-gray-600 dark:text-gray-300">Sampleville, OR 97526</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Balance</div>
          <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">$0.00</div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</div>
          <div className="text-gray-600 dark:text-gray-300">Just an example property.</div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Tenant</div>
          <div className="flex items-center justify-between">
            <div className="font-medium text-rose-600 dark:text-rose-400">Vacant</div>
            <Button 
              variant="link" 
              size="sm" 
              className="text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={() => navigate('/properties/place-new-tenant')}
            >
              <Plus className="mr-1 h-4 w-4" />
              Place New Tenant
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</div>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleAction('Add Note')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-gray-500 dark:text-gray-400">No notes</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Work Orders</div>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleAction('Add Work Order')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-gray-500 dark:text-gray-400">No work orders</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Listed</div>
          <div className="text-gray-600 dark:text-gray-300">Not Listed</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Applications</div>
          <div className="text-gray-600 dark:text-gray-300">0 Unread</div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Private Notes</div>
          <div className="text-gray-500 italic dark:text-gray-400">
            This is a sample property, feel free to delete it at any time.
          </div>
        </div>
      </div>
    </div>
  );
};