import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PropertiesTable } from "@/components/PropertiesTable";
import { PropertyDetails } from "@/components/PropertyDetails";
import { Filter, ListFilter, Plus } from "lucide-react";

const Properties = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <select className="rounded-md border border-gray-300 px-3 py-1.5">
                <option>All</option>
                <option>Vacant</option>
                <option>Occupied</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ListFilter className="mr-2 h-4 w-4" />
                View Listings (0)
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add a Property
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PropertiesTable />
          </div>
          <div>
            <PropertyDetails />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Properties;