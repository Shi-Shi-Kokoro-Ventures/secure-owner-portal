import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, Clock, Filter } from "lucide-react";

const Archives = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Archives</h1>
        <p className="text-muted-foreground">View and manage archived items</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Archived Properties</CardTitle>
            <Archive className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No archived properties</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Archived Tenants</CardTitle>
            <Archive className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No archived tenants</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Archived Documents</CardTitle>
            <Archive className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No archived documents</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter archives</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last updated: Never</span>
        </div>
      </div>
    </div>
  );
};

export default Archives;