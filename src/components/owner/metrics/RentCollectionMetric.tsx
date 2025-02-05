import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export const RentCollectionMetric = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Rent Collection</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,500</div>
        <p className="text-xs text-muted-foreground">$2,500 outstanding</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 w-[95%] rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs">95%</span>
        </div>
      </CardContent>
    </Card>
  );
};