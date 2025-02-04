import { Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OwnerProperties = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
        <p className="text-muted-foreground">Manage your property portfolio</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              123 Main Street
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Property details coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerProperties;