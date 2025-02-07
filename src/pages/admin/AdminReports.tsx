import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FinancialMetrics } from "@/components/admin/reports/FinancialMetrics";
import { LeaseMetrics } from "@/components/admin/reports/LeaseMetrics";
import { MaintenanceMetrics } from "@/components/admin/reports/MaintenanceMetrics";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MetricsSkeleton } from "@/components/admin/reports/MetricsSkeleton";

export default function AdminReports() {
  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    console.log(`Exporting as ${format}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('csv')}
              className="transition-all hover:scale-105"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('pdf')}
              className="transition-all hover:scale-105"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('excel')}
              className="transition-all hover:scale-105"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ErrorBoundary>
            <Suspense fallback={<MetricsSkeleton />}>
              <div className="transform transition-all hover:scale-[1.01]">
                <FinancialMetrics />
              </div>
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Suspense fallback={<MetricsSkeleton />}>
              <div className="transform transition-all hover:scale-[1.01]">
                <LeaseMetrics />
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
        
        <ErrorBoundary>
          <Suspense fallback={<MetricsSkeleton />}>
            <div className="transform transition-all hover:scale-[1.01]">
              <MaintenanceMetrics />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
    </AdminLayout>
  );
}