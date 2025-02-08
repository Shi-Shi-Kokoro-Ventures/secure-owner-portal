
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FilterBar } from "@/components/filter/FilterBar";
import { HeroSection } from "@/components/properties/HeroSection";
import { PropertyList } from "@/components/properties/PropertyList";
import { TestModeSetting } from "@/integrations/supabase/types/settings";
import { Property, Unit } from "@/types/property.types";

interface Filters {
  search?: string;
  bedrooms?: string;
  bathrooms?: string;
  featured?: boolean;
  sortBy?: string;
  propertyType?: string;
  propertyStatus?: string;
  priceRange?: number[];
}

const fetchProperties = async (filters: Filters) => {
  // First check if test mode is enabled
  const { data: testModeSetting } = await supabase
    .from('admin_settings')
    .select('setting_value')
    .eq('setting_key', 'test_mode')
    .single();

  const settingValue = testModeSetting?.setting_value as TestModeSetting;
  const testModeEnabled = settingValue?.enabled || false;

  let query = supabase
    .from('properties')
    .select(`
      *,
      units (
        id,
        unit_number,
        rent_amount,
        status,
        created_at,
        property_id,
        tenant_id
      )
    `);

  // Only show test data if test mode is enabled
  if (!testModeEnabled) {
    query = query.not('property_name', 'ilike', '%Test%');
  }

  // Base property status filter
  if (filters.propertyStatus && filters.propertyStatus !== 'all') {
    query = query.eq('status', filters.propertyStatus);
  } else {
    // Default to active properties if no status specified
    query = query.eq('status', 'active');
  }

  if (filters.search) {
    query = query.or(`property_name.ilike.%${filters.search}%,address.ilike.%${filters.search}%`);
  }

  if (filters.propertyType && filters.propertyType !== 'all') {
    query = query.eq('property_type', filters.propertyType);
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

  const { data, error } = await query;
  
  if (error) throw error;

  // Transform the data to match the Property & Unit types
  const propertiesWithUnits = data?.map((property: any) => ({
    ...property,
    units: property.units?.map((unit: any) => ({
      ...unit,
      created_at: unit.created_at || new Date().toISOString()
    }))
  })) as (Property & { units?: Unit[] })[];

  // Filter by price range after fetching because we need to check unit prices
  if (propertiesWithUnits && filters.priceRange) {
    const [minPrice, maxPrice] = filters.priceRange;
    return propertiesWithUnits.filter(property => {
      const availableUnits = property.units?.filter(unit => unit.status === 'vacant') || [];
      if (availableUnits.length === 0) return false;
      
      const lowestRent = Math.min(...availableUnits.map(unit => unit.rent_amount));
      return lowestRent >= minPrice && lowestRent <= maxPrice;
    });
  }

  return propertiesWithUnits;
};

const AvailableProperties = () => {
  const { toast } = useToast();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-12">
        <FilterBar onFilterChange={setFilters} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <PropertyList 
            properties={properties}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
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
