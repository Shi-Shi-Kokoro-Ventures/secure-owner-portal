import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";

// Temporarily removed authentication check for development
export const TenantLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default TenantLayout;