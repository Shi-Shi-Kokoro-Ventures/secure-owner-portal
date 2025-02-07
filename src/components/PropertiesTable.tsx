import { Building2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Property {
  id: string;
  property_name: string;
  address: string;
  unit_count: number;
  owner: {
    first_name: string;
    last_name: string;
  } | null;
  units: any[];
  status: string;
  total_revenue: number;
  property_type: string | null;
  last_inspection_date: string | null;
}

interface PropertiesTableProps {
  properties?: Property[];
  isLoading?: boolean;
}

export const PropertiesTable = ({ properties, isLoading }: PropertiesTableProps) => {
  const { toast } = useToast();

  const handleAction = (action: string, propertyId: string) => {
    if (action === "Delete") {
      const confirmed = window.confirm("Are you sure you want to delete this property? This action cannot be undone.");
      if (!confirmed) return;
    }
    
    toast({
      title: action,
      description: `${action} property ${propertyId}`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Building2 className="h-12 w-12 text-gray-400 dark:text-gray-600" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-medium">No properties found</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Get started by adding a new property.
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="relative overflow-x-auto rounded-md border dark:border-gray-700">
      <table 
        className="w-full text-left text-sm"
        role="grid"
        aria-label="Properties table"
      >
        <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-700 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-6 py-3">Property</th>
            <th scope="col" className="px-6 py-3">Type</th>
            <th scope="col" className="px-6 py-3">Owner</th>
            <th scope="col" className="px-6 py-3">Units</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Revenue</th>
            <th scope="col" className="px-6 py-3">Last Inspection</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr
              key={property.id}
              className="border-b bg-white hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">
                    {property.property_name}
                  </div>
                  <div className="text-gray-500">{property.address}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                {property.property_type || 'N/A'}
              </td>
              <td className="px-6 py-4">
                {property.owner
                  ? `${property.owner.first_name} ${property.owner.last_name}`
                  : "No owner assigned"}
              </td>
              <td className="px-6 py-4">
                {property.units.length} / {property.unit_count}
              </td>
              <td className="px-6 py-4">
                <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                  {property.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                {formatCurrency(property.total_revenue)}
              </td>
              <td className="px-6 py-4">
                {property.last_inspection_date 
                  ? format(new Date(property.last_inspection_date), 'MMM d, yyyy')
                  : 'Not inspected'}
              </td>
              <td className="px-6 py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleAction("View", property.id)}
                    >
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction("Edit", property.id)}
                    >
                      Edit property
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAction("Delete", property.id)}
                      className="text-red-600"
                    >
                      Delete property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
