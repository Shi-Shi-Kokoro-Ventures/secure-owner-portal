import { OccupancyMetric } from "./metrics/OccupancyMetric";
import { RentCollectionMetric } from "./metrics/RentCollectionMetric";
import { ExpensesMetric } from "./metrics/ExpensesMetric";
import { TenantsMetric } from "./metrics/TenantsMetric";
import { PropertyValueMetric } from "./metrics/PropertyValueMetric";
import { NetIncomeMetric } from "./metrics/NetIncomeMetric";
import { MaintenanceMetric } from "./metrics/MaintenanceMetric";
import { LeaseRenewalMetric } from "./metrics/LeaseRenewalMetric";
import { AlertsMetric } from "./metrics/AlertsMetric";
import { InspectionMetric } from "./metrics/InspectionMetric";
import { MaintenanceCostMetric } from "./metrics/MaintenanceCostMetric";
import { TenantSatisfactionMetric } from "./metrics/TenantSatisfactionMetric";

export const DashboardMetrics = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <OccupancyMetric />
      <RentCollectionMetric />
      <ExpensesMetric />
      <TenantsMetric />
      <PropertyValueMetric />
      <NetIncomeMetric />
      <MaintenanceMetric />
      <LeaseRenewalMetric />
      <AlertsMetric />
      <InspectionMetric />
      <MaintenanceCostMetric />
      <TenantSatisfactionMetric />
    </div>
  );
};