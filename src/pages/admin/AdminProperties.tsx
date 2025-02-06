import { AdminLayout } from "@/components/admin/AdminLayout";
import { PropertiesTable } from "@/components/PropertiesTable";
import { AddPropertyDialog } from "@/components/AddPropertyDialog";

export default function AdminProperties() {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <AddPropertyDialog />
        </div>
        <PropertiesTable />
      </div>
    </AdminLayout>
  );
}