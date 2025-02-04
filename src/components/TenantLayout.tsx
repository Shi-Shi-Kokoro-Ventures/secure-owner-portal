import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "./Layout";

// TODO: Replace with actual authentication check
const isTenant = () => {
  // Temporary mock - replace with actual auth check
  return true;
};

export const TenantLayout = () => {
  // Protect tenant routes
  if (!isTenant()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default TenantLayout;