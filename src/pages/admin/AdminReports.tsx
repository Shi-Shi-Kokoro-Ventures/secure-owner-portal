import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminReports() {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Reports & Analytics</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reports and analytics functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}