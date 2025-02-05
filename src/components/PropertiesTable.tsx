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
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="grid grid-cols-3 px-4 py-3">
          <div className="text-sm font-semibold uppercase tracking-wider">Property</div>
          <div className="text-sm font-semibold uppercase tracking-wider">Tenant</div>
          <div className="text-sm font-semibold uppercase tracking-wider">Balance</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="grid grid-cols-3 items-center gap-2 px-4 py-3 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
              <img 
                src="/lovable-uploads/34b95799-1197-441e-8517-5798003a835a.png" 
                alt="Sample Property"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Sample Property</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">123 Sample Ave</p>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
              Vacant
            </span>
          </div>
          <div className="font-medium text-gray-900 dark:text-gray-100">$0.00</div>
        </div>
      </div>

      {/* Table Footer */}
      <div className="flex flex-col items-center justify-between gap-2 border-t border-gray-200 bg-gray-50/50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/50 sm:flex-row">
        <div className="text-xs text-gray-700 dark:text-gray-300">
          Showing 1 to 1 of 1 entries
        </div>
        <div className="flex gap-1">
          <button 
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700" 
            disabled
            onClick={() => handlePagination('Previous')}
          >
            Previous
          </button>
          <button 
            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-white shadow-sm transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => handlePagination('Current')}
          >
            1
          </button>
          <button 
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700" 
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