import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface PropertyCardProps {
  property: {
    name: string;
    address: string;
    units: number;
    tenantCount: number;
    maintenanceCount: number;
    upcomingCount: number;
    occupancyRate: number;
    imageUrl: string;
  }
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-[200px] md:h-auto overflow-hidden">
          <img 
            src={property.imageUrl} 
            alt={property.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 rounded-full text-sm">
              {property.address}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{property.name}</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl font-bold">{property.tenantCount}</p>
              <p className="text-sm text-gray-500">Residents</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{property.units}</p>
              <p className="text-sm text-gray-500">Units</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{property.maintenanceCount}</p>
              <p className="text-sm text-gray-500">Vacant</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{property.upcomingCount}</p>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    Leased by {property.occupancyRate}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100 mt-1">
                <div 
                  style={{ width: `${property.occupancyRate}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};