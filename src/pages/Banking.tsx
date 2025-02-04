import { Layout } from "@/components/Layout";

const Banking = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banking</h1>
          <p className="text-muted-foreground">
            Manage your banking information and transactions
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p>Banking features coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Banking;