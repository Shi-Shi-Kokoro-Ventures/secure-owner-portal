import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "./Layout";

// TODO: Replace with actual authentication check from your auth system
const isTenant = () => {
  // Temporary mock - replace with actual auth check
  // For now, we'll return false to simulate being logged in as property manager
  return false;
};

export const TenantLayout = () => {
  // Protect tenant routes
  if (!isTenant()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default TenantLayout;