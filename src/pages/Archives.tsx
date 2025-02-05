import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, Download, Filter, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Archives = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Archives</h1>
            <p className="text-muted-foreground">
              Access and manage archived records
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Property Archives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/property-archives")}
              >
                View Archives
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Tenant Archives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/tenant-archives")}
              >
                View Archives
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Owner Archives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/owner-archives")}
              >
                View Archives
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Archives;