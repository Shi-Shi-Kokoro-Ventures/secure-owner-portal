
import { Layout } from "@/components/Layout";
import { DashboardSection } from "@/components/properties/DashboardSection";
import { PropertiesSection } from "@/components/properties/PropertiesSection";

const Properties = () => {
  return (
    <Layout>
      <div className="space-y-4 animate-fade-in">
        <DashboardSection />
        <PropertiesSection />
      </div>
    </Layout>
  );
};

export default Properties;

