import { Card } from "@/components/ui/card";
import { Building2, Users, AlertCircle, MapPin, MoreVertical, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropertyCardProps {
  property: {
    name: string;
    address: string;
    units: number;
    occupancyRate: number;
    revenue: number;
    imageUrl: string;
    propertyCount?: number;
    tenantCount?: number;
    maintenanceCount?: number;
  }
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-glass">
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
              <img 
                src={property.imageUrl} 
                alt={property.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{property.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                {property.address}
              </div>
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">{property.propertyCount || property.units} Properties</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">{property.tenantCount || 0} Tenants</span>
                </div>
                {property.maintenanceCount !== undefined && (
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{property.maintenanceCount} Request</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                Edit property
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Remove property
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Open on maps
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Show Property Calendar
          </Button>
        </div>
      </div>
    </Card>
  );
};