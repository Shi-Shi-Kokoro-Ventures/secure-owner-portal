
import { PropertiesTable } from "@/components/PropertiesTable";
import { PropertyDetails } from "@/components/PropertyDetails";
import { PropertyControls } from "./PropertyControls";
import { AddPropertyDialog } from "@/components/AddPropertyDialog";
import { useState } from "react";

export const PropertiesSection = () => {
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);

  return (
    <div className="space-y-4">
      <PropertyControls onAddProperty={() => setAddPropertyOpen(true)} />
      
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PropertiesTable />
        </div>
        <div className="w-full">
          <PropertyDetails />
        </div>
      </div>

      <AddPropertyDialog 
        open={addPropertyOpen} 
        onOpenChange={setAddPropertyOpen}
      />
    </div>
  );
};

