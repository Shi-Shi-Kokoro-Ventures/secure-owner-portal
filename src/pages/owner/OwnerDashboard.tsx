import { DashboardMetrics } from "@/components/owner/DashboardMetrics";
import { PropertyCard } from "@/components/owner/PropertyCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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
    <div className="min-h-full bg-gray-50">
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Properties</h1>
            <p className="mt-1 text-sm text-gray-500">
              3 Property Place
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="pl-10 w-full bg-white border-gray-200"
              />
            </div>
            <select 
              className="ml-4 rounded-lg border border-gray-200 px-4 py-2 bg-white text-sm text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              <option>All Properties</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
          </div>

          <DashboardMetrics />

          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;