import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FinancialMetrics } from "@/components/admin/reports/FinancialMetrics";
import { LeaseMetrics } from "@/components/admin/reports/LeaseMetrics";
import { MaintenanceMetrics } from "@/components/admin/reports/MaintenanceMetrics";

export default function AdminReports() {
  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    // TODO: Implement export functionality
    console.log(`Exporting as ${format}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FinancialMetrics />
          <LeaseMetrics />
        </div>
        
        <div className="mt-6">
          <MaintenanceMetrics />
        </div>
      </div>
    </AdminLayout>
  );
}