
import { PropertiesTable } from "@/components/PropertiesTable";
import { PropertyDetails } from "@/components/PropertyDetails";
import { PropertyControls } from "./PropertyControls";
import { AddPropertyDialog } from "@/components/AddPropertyDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MetricsSkeleton } from "@/components/admin/reports/MetricsSkeleton";

export const PropertiesSection = () => {
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simulate loading for demo
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  const handlePropertyAction = (action: string) => {
    toast({
      title: "Success",
      description: `Property ${action.toLowerCase()} successful`,
    });
  };

  return (
    <div className="space-y-4">
      <PropertyControls 
        onAddProperty={() => setAddPropertyOpen(true)}
        onAction={handlePropertyAction}
      />
      
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {isLoading ? (
            <div className="space-y-4">
              <MetricsSkeleton />
              <MetricsSkeleton />
              <MetricsSkeleton />
            </div>
          ) : (
            <PropertiesTable isLoading={isLoading} />
          )}
        </div>
        <div className="w-full">
          {isLoading ? (
            <MetricsSkeleton />
          ) : (
            <PropertyDetails />
          )}
        </div>
      </div>

      <AddPropertyDialog 
        open={addPropertyOpen} 
        onOpenChange={setAddPropertyOpen}
        onSuccess={() => {
          toast({
            title: "Success",
            description: "Property added successfully",
          });
        }}
        onError={(error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }}
      />
    </div>
  );
};
