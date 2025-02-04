import { Layout } from "@/components/Layout";
import { OwnersTable } from "@/components/OwnersTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, DollarSign } from "lucide-react";

const Owners = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Owners</h1>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Filter"
              className="w-[200px]"
            />
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2 bg-[#0072bc] hover:bg-[#005a96]">
              <Plus className="h-4 w-4" />
              Add an Owner
            </Button>
            <Button className="gap-2 bg-[#00a651] hover:bg-[#008541]">
              <DollarSign className="h-4 w-4" />
              Pay All Owners
            </Button>
          </div>
        </div>
        <OwnersTable />
        <footer className="text-sm text-gray-600 mt-8">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:underline">Knowledge Base</a>
            <span>|</span>
            <a href="#" className="hover:underline">Refer a Friend</a>
            <div className="flex-1 text-right">
              © 2008 - 2025 Rentec Direct, LLC
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Owners;