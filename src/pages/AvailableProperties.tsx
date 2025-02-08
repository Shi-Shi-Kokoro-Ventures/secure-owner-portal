
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Home, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FilterBar } from "@/components/filter/FilterBar";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Filters {
  search?: string;
  bedrooms?: string;
  bathrooms?: string;
  featured?: boolean;
  sortBy?: string;
  propertyType?: string;
  priceRange?: number[];
}

const fetchProperties = async (filters: Filters) => {
  let query = supabase
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

  if (filters.search) {
    query = query.or(`property_name.ilike.%${filters.search}%,address.ilike.%${filters.search}%`);
  }

  if (filters.bedrooms && filters.bedrooms !== 'any') {
    const bedroomsNum = parseInt(filters.bedrooms);
    query = query.gte('bedrooms', bedroomsNum);
  }

  if (filters.bathrooms && filters.bathrooms !== 'any') {
    const bathroomsNum = parseInt(filters.bathrooms);
    query = query.gte('bathrooms', bathroomsNum);
  }

  if (filters.featured) {
    query = query.eq('is_featured', true);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        query = query.order('rent_amount', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('rent_amount', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

const AvailableProperties = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState<Filters>({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['available-properties', filters],
    queryFn: () => fetchProperties(filters),
  });

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load properties. Please try again later.",
      variant: "destructive",
    });
  }

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Calculate pagination
  const totalPages = properties ? Math.ceil(properties.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties?.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-gray-900 to-gray-600 bg-gradient-to-r">
        <div className="absolute inset-0 bg-black/40" />
        <img
          src="/lovable-uploads/472479b1-526e-4e85-93df-35b2efcf593c.png"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Home</h1>
          <p className="text-xl text-gray-200 max-w-2xl text-center">
            Explore our curated selection of premium properties available for rent
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-12">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        ) : currentProperties && currentProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProperties.map((property) => {
                const availableUnits = property.units?.filter(unit => unit.status === 'vacant') || [];
                const lowestRent = availableUnits.length > 0 
                  ? Math.min(...availableUnits.map(unit => unit.rent_amount))
                  : null;

                return (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
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
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
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
