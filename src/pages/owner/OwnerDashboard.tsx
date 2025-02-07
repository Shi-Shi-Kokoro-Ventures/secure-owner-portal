import { DashboardMetrics } from "@/components/owner/DashboardMetrics";
import { PropertyCard } from "@/components/owner/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const properties = [
  {
    id: 1,
    name: "Salama Property, Thornridge",
    address: "Cir. Syracuse, Connecticut 3564",
    type: "Apartment Complex",
    units: 32,
    occupancyRate: 75,
    revenue: 12000,
    imageUrl: "/lovable-uploads/e5ea4050-58aa-4ce1-a86a-7d8c5f04fc39.png",
    tenantCount: 10,
    maintenanceCount: 8
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
    maintenanceCount: 3
  }
];

const OwnerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">My Properties</h1>
            <p className="mt-2 text-muted-foreground">
              3 Property Place
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="pl-10 w-[300px] bg-white dark:bg-gray-800"
              />
            </div>
            <select 
              className="rounded-lg border border-gray-200 px-4 py-2 bg-white dark:bg-gray-800 shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              <option>All Properties</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
          </div>
        </div>

        <DashboardMetrics />

        <div className="mt-8 space-y-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <Card className="mt-8 p-6 bg-gradient-glass">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Another Property?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Expand your portfolio by adding more properties
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;