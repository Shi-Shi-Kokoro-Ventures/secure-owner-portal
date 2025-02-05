import { Layout } from "@/components/Layout";
import { OwnersTable } from "@/components/OwnersTable";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  const handleSearch = (term: string) => {
    console.log("Searching for:", term);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Owners</h2>
          <SearchBar onSearch={handleSearch} />
        </div>
        <OwnersTable />
      </div>
    </Layout>
  );
};

export default Index;