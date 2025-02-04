import { PropertyCard } from "@/components/owner/PropertyCard";
import { PropertyStats } from "@/components/owner/PropertyStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockProperties = [
  {
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90028",
    units: 4,
    occupancyRate: 100,
    revenue: 8000,
    imageUrl: "/lovable-uploads/34b95799-1197-441e-8517-5798003a835a.png"
  },
  {
    name: "Ocean View Complex",
    address: "456 Ocean Dr, Santa Monica, CA 90401",
    units: 6,
    occupancyRate: 83,
    revenue: 12000,
    imageUrl: "/lovable-uploads/1ab03cf0-3373-4f12-80ac-d96a64aeb0de.png"
  },
  {
    name: "Mountain Lodge",
    address: "789 Mountain Rd, Beverly Hills, CA 90210",
    units: 2,
    occupancyRate: 100,
    revenue: 4500,
    imageUrl: "/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png"
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