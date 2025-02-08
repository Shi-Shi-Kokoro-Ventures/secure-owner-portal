
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Home, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const fetchProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      units (
        id,
        unit_number,
        rent_amount,
        status
      )
    `)
    .eq('status', 'active');

  if (error) throw error;
  return data;
};

const AvailableProperties = () => {
  const { toast } = useToast();
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['available-properties'],
    queryFn: fetchProperties,
  });

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load properties. Please try again later.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#1a4f7c] mb-8">Available Properties</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => {
              const availableUnits = property.units?.filter(unit => unit.status === 'vacant') || [];
              const lowestRent = availableUnits.length > 0 
                ? Math.min(...availableUnits.map(unit => unit.rent_amount))
                : null;

              return (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={property.property_image_url || '/placeholder.svg'}
                      alt={property.property_name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-[#1a4f7c] mb-2">
                      {property.property_name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{property.address}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {property.square_footage && (
                        <div className="flex items-center text-gray-600">
                          <Home className="h-4 w-4 mr-2" />
                          <span>{property.square_footage} sq ft</span>
                        </div>
                      )}
                      {availableUnits.length > 0 && (
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{availableUnits.length} unit(s) available</span>
                        </div>
                      )}
                    </div>

                    {lowestRent && (
                      <p className="text-lg font-semibold text-[#1a4f7c] mb-4">
                        Starting at ${lowestRent.toLocaleString()}/month
                      </p>
                    )}

                    <Button 
                      className="w-full bg-[#1a4f7c] hover:bg-[#153f63]"
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
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No properties available at the moment.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableProperties;
