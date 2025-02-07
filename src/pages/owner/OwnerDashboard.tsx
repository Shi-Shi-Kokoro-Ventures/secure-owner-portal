import { DashboardMetrics } from "@/components/owner/DashboardMetrics";
import { PropertyCard } from "@/components/owner/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Plus } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here's an overview of your properties.
        </p>
      </div>

      <DashboardMetrics />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Your Properties</h2>
          <Button variant="outline" size="sm">
            <Building2 className="h-4 w-4 mr-2" />
            View All Properties
          </Button>
        </div>

        <div className="grid gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <Card className="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Another Property?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Expand your portfolio by adding more properties
              </p>
            </div>
            <Button>
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