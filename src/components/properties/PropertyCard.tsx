
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bed, Bath, Home, MapPin } from "lucide-react";
import { Property, Unit } from "@/types/property.types";

interface PropertyCardProps {
  property: Property & {
    units?: Unit[];
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const { toast } = useToast();
  const availableUnits = property.units?.filter(unit => unit.status === 'vacant') || [];
  const lowestRent = availableUnits.length > 0 
    ? Math.min(...availableUnits.map(unit => unit.rent_amount))
    : null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative">
        <img
          src={property.property_image_url || '/placeholder.svg'}
          alt={property.property_name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            For Rent
          </span>
        </div>
        {lowestRent && (
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
              ${lowestRent.toLocaleString()}/month
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {property.property_name}
        </h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{property.address}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {property.bedrooms && (
            <div className="flex items-center text-gray-600">
              <Bed className="h-4 w-4 mr-2" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center text-gray-600">
              <Bath className="h-4 w-4 mr-2" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
          )}
          {property.square_footage && (
            <div className="flex items-center text-gray-600">
              <Home className="h-4 w-4 mr-2" />
              <span className="text-sm">{property.square_footage} sq ft</span>
            </div>
          )}
        </div>

        <Button 
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={() => {
            toast({
              title: "Coming Soon",
              description: "Detailed property view will be available soon.",
            });
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
