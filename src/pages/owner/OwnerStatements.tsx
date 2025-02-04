import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OwnerStatements = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Statements</h1>
        <p className="text-muted-foreground">View your financial statements</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Financial Statements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Statement details coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerStatements;