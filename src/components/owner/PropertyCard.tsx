import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    name: string;
    address: string;
    units: number;
    occupancyRate: number;
    revenue: number;
    imageUrl: string;
  }
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white">{property.name}</h3>
          <p className="text-sm text-white/80">{property.address}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Building2 className="h-4 w-4 mr-2" />
              <span className="text-sm">Units</span>
            </div>
            <p className="font-semibold">{property.units}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm">Occupancy</span>
            </div>
            <p className="font-semibold">
              <span className={cn(
                property.occupancyRate >= 90 ? "text-green-600" :
                property.occupancyRate >= 70 ? "text-yellow-600" :
                "text-red-600"
              )}>
                {property.occupancyRate}%
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="text-sm">Revenue</span>
            </div>
            <p className="font-semibold">{formatCurrency(property.revenue)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};