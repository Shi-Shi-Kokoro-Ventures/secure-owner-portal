import { NetIncomeMetric } from "./metrics/NetIncomeMetric";
import { RentCollectionMetric } from "./metrics/RentCollectionMetric";
import { OccupancyMetric } from "./metrics/OccupancyMetric";
import { MaintenanceMetric } from "./metrics/MaintenanceMetric";

export const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <NetIncomeMetric />
      <RentCollectionMetric />
      <OccupancyMetric />
      <MaintenanceMetric />
    </div>
  );
};