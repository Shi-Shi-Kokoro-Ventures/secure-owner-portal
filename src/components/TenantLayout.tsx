import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "./Layout";

// TODO: Replace with actual authentication check from your auth system
const isTenant = () => {
  // This is a temporary mock - replace with actual auth check
  // For demo purposes, we'll check if we're on the tenant route after login
  return window.location.pathname.startsWith('/tenant');
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