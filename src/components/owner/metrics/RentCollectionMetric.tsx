import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export const RentCollectionMetric = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">Rent Collection</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <DollarSign className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$45,500</div>
        <p className="text-sm text-muted-foreground">$2,500 outstanding</p>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
              <div className="h-2 w-[95%] rounded-full bg-green-500 transition-all duration-500"></div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">95%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};