import { MaintenanceRequestForm } from "@/components/maintenance/MaintenanceRequestForm";

const NewMaintenanceRequest = () => {
  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Submit Maintenance Request</h1>
        <p className="text-muted-foreground">
          Please provide details about the maintenance issue
        </p>
      </div>
      <MaintenanceRequestForm />
    </div>
  );
};

export default NewMaintenanceRequest;