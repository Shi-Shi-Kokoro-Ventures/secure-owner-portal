
import { PropertySummaryCards } from "./PropertySummaryCards";
import { PropertySummaryChart } from "./PropertySummaryChart";
import { IncomeSummary } from "./IncomeSummary";
import { SystemUpdates } from "./SystemUpdates";
import { NewsAndTips } from "./NewsAndTips";
import { QuickAccess } from "./QuickAccess";

export const DashboardSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Summary</h1>
        <div className="flex items-center gap-4">
          <select 
            className="rounded-md border border-gray-300 px-3 py-1.5 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            onChange={(e) => {
              // Property type change handler
            }}
          >
            <option>All Properties</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>
      </div>

      <PropertySummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PropertySummaryChart />
        <IncomeSummary />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SystemUpdates />
        <NewsAndTips />
      </div>

      <QuickAccess />
    </div>
  );
};

