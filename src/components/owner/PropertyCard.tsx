import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, AlertCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start space-x-4 p-4">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img 
            src={property.imageUrl} 
            alt={property.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                {property.address}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </Button>
          </div>
          
          <div className="mt-4 flex items-center space-x-6">
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
    </Card>
  );
};