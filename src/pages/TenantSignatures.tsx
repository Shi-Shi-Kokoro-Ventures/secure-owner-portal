import { Layout } from "@/components/Layout";

const TenantSignatures = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Signatures</h1>
          <p className="text-muted-foreground">
            Manage and track tenant signature requests
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p>Tenant signature features coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default TenantSignatures;