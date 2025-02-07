import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCard } from "@/components/owner/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Salama Property, Thornridge",
    address: "Cir. Syracuse, Connecticut 3564",
    type: "Apartment Complex",
    units: 32,
    occupancyRate: 75,
    revenue: 12000,
    imageUrl: "/lovable-uploads/654bda82-66ad-4b81-96b5-2acfa997dc7a.png",
    tenantCount: 10,
    maintenanceCount: 8,
    upcomingCount: 3
  },
  {
    id: 2,
    name: "Montan Property",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    type: "Luxury Condos",
    units: 24,
    occupancyRate: 100,
    revenue: 18000,
    imageUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    tenantCount: 10,
    maintenanceCount: 3,
    upcomingCount: 2
  }
];

const OwnerProperties = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground mt-1">
            3 Property Place
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            className="rounded-md border border-gray-300 px-3 py-1.5 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          >
            <option>All Properties</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={(term) => console.log('Searching:', term)} />
      </div>

      <div className="space-y-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-8">
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Need to add another property?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  You can easily add more properties to your portfolio
                </p>
              </div>
              <Button>
                Add Property
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerProperties;