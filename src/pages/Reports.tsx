import { Layout } from "@/components/Layout";
import { ReportCategories } from "@/components/reports/ReportCategories";
import { ReportActions } from "@/components/reports/ReportActions";
import { ReportsTable } from "@/components/reports/ReportsTable";

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage property management reports
          </p>
        </div>

        <ReportCategories />
        <ReportActions />
        <ReportsTable />
      </div>
    </Layout>
  );
};

export default Reports;