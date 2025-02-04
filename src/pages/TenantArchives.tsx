import { Layout } from "@/components/Layout";

const TenantArchives = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Archives</h1>
          <p className="text-muted-foreground">
            Access archived tenant records and documents
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p>Tenant archive features coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default TenantArchives;