import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface PropertyCardProps {
  property: {
    name: string;
    address: string;
    units: number;
    occupancyRate: number;
    revenue: number;
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {property.name}
        </CardTitle>
        <Building2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{property.address}</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Units</p>
              <p className="font-medium">{property.units}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Occupancy</p>
              <p className="font-medium">{property.occupancyRate}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Revenue</p>
              <p className="font-medium">{formatCurrency(property.revenue)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};