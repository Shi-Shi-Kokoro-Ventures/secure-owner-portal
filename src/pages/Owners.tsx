
import { Layout } from "@/components/Layout";
import { OwnersTable } from "@/components/OwnersTable";
import { Button } from "@/components/ui/button";
import { Filter, Plus, DollarSign, Download, Printer } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { AddOwnerDialog } from "@/components/AddOwnerDialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Owners = () => {
  const [showAddOwner, setShowAddOwner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // TODO: Implement search functionality
  };

  const handleAddOwner = async (ownerData: any) => {
    try {
      const { error } = await supabase.from('users').insert({
        first_name: ownerData.name.split(' ')[0],
        last_name: ownerData.name.split(' ').slice(1).join(' '),
        email: ownerData.email,
        phone: ownerData.phone,
        role: 'owner'
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Owner added successfully",
      });
      
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error adding owner:', error);
      toast({
        title: "Error",
        description: "Failed to add owner. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Property Owners</h1>
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
          <OwnersTable onRefresh={() => refreshTrigger} />
        </div>

        <AddOwnerDialog 
          open={showAddOwner}
          onOpenChange={setShowAddOwner}
          onAddOwner={handleAddOwner}
        />
      </div>
    </Layout>
  );
};

export default Owners;
