import { Layout } from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Property Manager</h1>
        <p className="mt-4 text-gray-600">
          Please use the navigation menu to access different sections of the application.
        </p>
      </div>
    </Layout>
  );
};

export default Index;