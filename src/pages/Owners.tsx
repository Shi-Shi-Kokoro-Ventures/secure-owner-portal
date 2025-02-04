import { Layout } from "@/components/Layout";
import { OwnersTable } from "@/components/OwnersTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, DollarSign, Download, Printer } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { AddOwnerDialog } from "@/components/AddOwnerDialog";
import { useState } from "react";

const Owners = () => {
  const [showAddOwner, setShowAddOwner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // TODO: Implement search functionality
  };

  const handleAddOwner = (ownerData: any) => {
    // TODO: Implement add owner functionality
    console.log("Adding owner:", ownerData);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Owners</h1>
          <div className="flex items-center gap-2">
            <SearchBar onSearch={handleSearch} />
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button 
              className="gap-2 bg-[#0072bc] hover:bg-[#005a96]"
              onClick={() => setShowAddOwner(true)}
            >
              <Plus className="h-4 w-4" />
              Add an Owner
            </Button>
            <Button className="gap-2 bg-[#00a651] hover:bg-[#008541]">
              <DollarSign className="h-4 w-4" />
              Pay All Owners
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-end mb-4 space-x-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
          <OwnersTable />
        </div>

        <AddOwnerDialog 
          open={showAddOwner}
          onOpenChange={setShowAddOwner}
          onAddOwner={handleAddOwner}
        />

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