import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PropertiesTable } from "@/components/PropertiesTable";
import { PropertyDetails } from "@/components/PropertyDetails";
import { AddPropertyDialog } from "@/components/AddPropertyDialog";
import { PropertySummaryCards } from "@/components/properties/PropertySummaryCards";
import { PropertySummaryChart } from "@/components/properties/PropertySummaryChart";
import { IncomeSummary } from "@/components/properties/IncomeSummary";
import { SystemUpdates } from "@/components/properties/SystemUpdates";
import { NewsAndTips } from "@/components/properties/NewsAndTips";
import { QuickAccess } from "@/components/properties/QuickAccess";
import { PropertyControls } from "@/components/properties/PropertyControls";

const Properties = () => {
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
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

        <PropertyControls onAddProperty={() => setAddPropertyOpen(true)} />
        
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PropertiesTable />
          </div>
          <div className="w-full">
            <PropertyDetails />
          </div>
        </div>
      </div>
      <AddPropertyDialog 
        open={addPropertyOpen} 
        onOpenChange={setAddPropertyOpen}
      />
    </Layout>
  );
};

export default Properties;
