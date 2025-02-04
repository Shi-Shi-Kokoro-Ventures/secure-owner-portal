import { PropertyCard } from "@/components/owner/PropertyCard";
import { PropertyStats } from "@/components/owner/PropertyStats";

const mockProperties = [
  {
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90028",
    units: 4,
    occupancyRate: 100,
    revenue: 8000,
  },
  {
    name: "Ocean View Complex",
    address: "456 Ocean Dr, Santa Monica, CA 90401",
    units: 6,
    occupancyRate: 83,
    revenue: 12000,
  },
  {
    name: "Mountain Lodge",
    address: "789 Mountain Rd, Beverly Hills, CA 90210",
    units: 2,
    occupancyRate: 100,
    revenue: 4500,
  },
];

const OwnerProperties = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Properties</h1>
        <p className="text-muted-foreground">
          Overview of your property portfolio and performance
        </p>
      </div>

      <PropertyStats />

      <div className="mt-6">
        <h2 className="mb-4 text-lg font-semibold">Property List</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProperties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerProperties;