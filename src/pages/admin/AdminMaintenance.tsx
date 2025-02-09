import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceRequestDetails } from "@/components/maintenance/MaintenanceRequestDetails";

export default function AdminMaintenance() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general'
  });

  const [error, setError] = useState<string>("");

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Maintenance Management</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceRequestDetails 
                formData={formData}
                setFormData={setFormData}
                error={error}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}