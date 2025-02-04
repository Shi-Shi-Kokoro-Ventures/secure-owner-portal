import { PropertyCard } from "@/components/owner/PropertyCard";
import { PropertyStats } from "@/components/owner/PropertyStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockProperties = [
  {
    name: "Modern Triplex",
    address: "456 Contemporary Ave, Los Angeles, CA 90028",
    units: 6,
    occupancyRate: 100,
    revenue: 15000,
    imageUrl: "/lovable-uploads/034ef3b6-46b9-4c34-83c5-06aaf235ef29.png"
  },
  {
    name: "Urban Heights",
    address: "789 Skyline Dr, Santa Monica, CA 90401",
    units: 3,
    occupancyRate: 83,
    revenue: 9000,
    imageUrl: "/lovable-uploads/4593ebac-7117-4d76-9862-5d9e41a94352.png"
  },
  {
    name: "The Stacks",
    address: "123 Vertical Way, Beverly Hills, CA 90210",
    units: 4,
    occupancyRate: 75,
    revenue: 12000,
    imageUrl: "/lovable-uploads/654bda82-66ad-4b81-96b5-2acfa997dc7a.png"
  },
];

const OwnerProperties = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              My Properties
            </h1>
            <p className="text-muted-foreground mt-1">
              Overview of your property portfolio and performance
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <PropertyStats />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">Property Portfolio</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockProperties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerProperties;