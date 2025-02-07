import { Layout } from "@/components/Layout";
import { ServiceHeader } from "@/components/services/ServiceHeader";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Services = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 space-y-8">
        <ErrorBoundary>
          <ServiceHeader />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ServiceGrid />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Services;