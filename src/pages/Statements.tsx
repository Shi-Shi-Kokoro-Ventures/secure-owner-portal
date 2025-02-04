import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter } from "lucide-react";

const Statements = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Financial Statements</h1>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              className="w-[200px]"
            />
            <span>to</span>
            <Input
              type="date"
              className="w-[200px]"
            />
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Statement
            </Button>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <p className="text-center text-gray-500">
            Select a date range to view statements
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Statements;