import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";

export const TenantLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default TenantLayout;