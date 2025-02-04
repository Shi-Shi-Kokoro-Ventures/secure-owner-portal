import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Download, FileBarChart } from "lucide-react";

const OwnerReports = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and view property performance reports
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Income Statement",
                "Balance Sheet",
                "Cash Flow Statement",
              ].map((report) => (
                <div
                  key={report}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <FileBarChart className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{report}</p>
                      <p className="text-sm text-muted-foreground">
                        Updated daily
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Occupancy Trends",
                "Maintenance Analysis",
                "Revenue Report",
              ].map((report) => (
                <div
                  key={report}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <BarChart className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{report}</p>
                      <p className="text-sm text-muted-foreground">
                        Interactive report
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerReports;