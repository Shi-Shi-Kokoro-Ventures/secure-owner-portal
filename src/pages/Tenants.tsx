import { Layout } from "@/components/Layout";

const Tenants = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground">
            Manage your tenants and their information
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p>Tenant management features coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Tenants;