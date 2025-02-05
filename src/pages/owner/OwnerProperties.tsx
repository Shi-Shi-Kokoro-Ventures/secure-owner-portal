import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCard } from "@/components/owner/PropertyCard";
import { PropertyStats } from "@/components/owner/PropertyStats";

const properties = [
  {
    id: 1,
    name: "The Stacks",
    address: "123 Main Street, San Francisco, CA",
    type: "Apartment Complex",
    units: 4,
    occupancyRate: 75,
    revenue: 12000,
    imageUrl: "/lovable-uploads/654bda82-66ad-4b81-96b5-2acfa997dc7a.png"
  },
  {
    id: 2,
    name: "Oceanview Residences",
    address: "456 Beach Road, San Diego, CA",
    type: "Luxury Condos",
    units: 6,
    occupancyRate: 100,
    revenue: 18000,
    imageUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544"
  },
  {
    id: 3,
    name: "Highland Towers",
    address: "789 Hill Avenue, Los Angeles, CA",
    type: "High-rise Building",
    units: 8,
    occupancyRate: 88,
    revenue: 24000,
    imageUrl: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2"
  },
];

const OwnerProperties = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Properties</h1>
        <p className="text-muted-foreground">
          Overview of your property portfolio
        </p>
      </div>

      <PropertyStats />

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default OwnerProperties;