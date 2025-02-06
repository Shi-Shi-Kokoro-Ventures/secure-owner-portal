import { AdminLayout } from "@/components/admin/AdminLayout";
import { LeasesTable } from "@/components/admin/leases/LeasesTable";
import { LeaseMetrics } from "@/components/admin/leases/LeaseMetrics";

export default function AdminLeases() {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Lease Management</h1>
        <LeaseMetrics />
        <div className="mt-6">
          <LeasesTable />
        </div>
      </div>
    </AdminLayout>
  );
}