
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
    toast({
      title: action,
      description: `${action} property ${propertyId}`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Building2 className="h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium">No properties found</h3>
        <p className="mt-2 text-sm text-gray-500">
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
    <div className="relative overflow-x-auto rounded-md border">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Property</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Owner</th>
            <th className="px-6 py-3">Units</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Revenue</th>
            <th className="px-6 py-3">Last Inspection</th>
            <th className="px-6 py-3">Actions</th>
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
