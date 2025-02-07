
import { Button } from "@/components/ui/button";
import { Filter, ListFilter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PropertyControlsProps {
  onAddProperty: () => void;
}

export const PropertyControls = ({ onAddProperty }: PropertyControlsProps) => {
  const { toast } = useToast();

  const handleFilterClick = () => {
    toast({
      title: "Filter Applied",
      description: "Property filter functionality coming soon",
    });
  };

  const handleViewListings = () => {
    toast({
      title: "View Listings",
      description: "Property listings view coming soon",
    });
  };

  const handlePropertyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    toast({
      title: "Property Type Changed",
      description: `Selected: ${event.target.value}`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 className="text-xl font-semibold text-gray-900">Properties</h2>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <select 
            className="rounded-md border border-gray-300 px-3 py-1.5 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            onChange={handlePropertyTypeChange}
          >
            <option>All</option>
            <option>Vacant</option>
            <option>Occupied</option>
          </select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleFilterClick}
            className="hover:bg-gray-50 transition-colors"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleViewListings}
            className="hover:bg-gray-50 transition-colors"
          >
            <ListFilter className="mr-2 h-4 w-4" />
            View Listings (0)
          </Button>
          <Button 
            size="sm" 
            onClick={onAddProperty}
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add a Property
          </Button>
        </div>
      </div>
    </div>
  );
};
