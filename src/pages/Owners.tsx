import { Layout } from "@/components/Layout";
import { OwnersTable } from "@/components/OwnersTable";

const Owners = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Property Owners</h1>
        </div>
        <OwnersTable />
      </div>
    </Layout>
  );
};

export default Owners;