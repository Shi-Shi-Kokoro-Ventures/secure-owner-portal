import { Card, CardContent } from "@/components/ui/card";
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
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold text-white mb-1">{property.name}</h3>
          <p className="text-sm text-white/90 font-medium">{property.address}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Building2 className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Units</span>
            </div>
            <p className="text-lg font-semibold">{property.units}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Occupancy</span>
            </div>
            <p className="text-lg font-semibold">
              <span className={cn(
                "px-2 py-0.5 rounded-full text-sm",
                property.occupancyRate >= 90 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                property.occupancyRate >= 70 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}>
                {property.occupancyRate}%
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <p className="text-lg font-semibold">{formatCurrency(property.revenue)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};