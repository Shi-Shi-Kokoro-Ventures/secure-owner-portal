import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLeases = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Lease Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>Active Leases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Lease management interface coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminLeases;