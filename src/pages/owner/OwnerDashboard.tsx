import { DashboardMetrics } from "@/components/owner/DashboardMetrics";
import { PropertyCard } from "@/components/owner/PropertyCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const properties = [
  {
    id: 1,
    name: "Sobha Garden",
    address: "Residential",
    type: "Apartment Complex",
    units: 1032,
    occupancyRate: 87,
    revenue: 223600,
    imageUrl: "/lovable-uploads/531687d0-0128-43a9-a912-780524a157d5.png",
    tenantCount: 1810,
    maintenanceCount: 134,
    upcomingCount: 73
  }
];

const OwnerDashboard = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search properties..."
                  className="pl-10 w-[300px] bg-white border-gray-200"
                />
              </div>
              <select 
                className="rounded-lg border border-gray-200 px-4 py-2 bg-white text-sm text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option>All Properties</option>
                <option>Residential</option>
                <option>Commercial</option>
              </select>
            </div>
          </div>

          {/* Payment Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Rent</p>
                <p className="text-2xl font-bold">$223,600</p>
              </div>
            </Card>
            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Additional services</p>
                <p className="text-2xl font-bold">$24,840</p>
              </div>
            </Card>
            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Maintenance</p>
                <p className="text-2xl font-bold">$31,840</p>
              </div>
            </Card>
            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Debt</p>
                <p className="text-2xl font-bold text-red-500">$16,485</p>
              </div>
            </Card>
          </div>

          {/* Property Cards */}
          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Work Orders and Staff Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Work Orders</h2>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-3xl font-bold">9</p>
                  <p className="text-sm text-gray-500">New</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">34</p>
                  <p className="text-sm text-gray-500">Open</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">18</p>
                  <p className="text-sm text-gray-500">In Progress</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-sm text-gray-500">Delayed</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">On-site staff</h2>
                <Button variant="outline" size="sm">Schedule</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Security</p>
                  <p className="text-sm text-gray-500">Louis Hodges</p>
                  <p className="text-sm text-gray-500">+971 5 927 6701</p>
                </div>
                <div>
                  <p className="font-medium">Maintenance</p>
                  <p className="text-sm text-gray-500">Hans Bowman</p>
                  <p className="text-sm text-gray-500">+971 5 927 6701</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;