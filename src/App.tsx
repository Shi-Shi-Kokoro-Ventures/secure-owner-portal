
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth-context";
import { commonRoutes } from "./routes/commonRoutes";
import { propertyManagerRoutes } from "./routes/propertyManagerRoutes";
import { tenantRoutes } from "./routes/tenantRoutes";
import { ownerRoutes } from "./routes/ownerRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { vendorRoutes } from "./routes/vendorRoutes";
import { ErrorBoundary } from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useAuth } from "./hooks/use-auth-context";
import { Layout } from "./components/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Root redirect component that handles authentication and role-based routing
const RootRedirect = () => {
  const { user, userProfile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based redirects
  switch (userProfile?.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'property_manager':
      return <Navigate to="/property-manager/dashboard" replace />;
    case 'tenant':
      return <Navigate to="/tenant/dashboard" replace />;
    case 'owner':
      return <Navigate to="/owner/dashboard" replace />;
    case 'vendor':
      return <Navigate to="/vendor/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// Layout wrapper components for each role
const AdminLayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const PropertyManagerLayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const OwnerLayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const TenantLayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const VendorLayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* Root redirect with auth check */}
              <Route path="/" element={<RootRedirect />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />

              {/* Admin routes with Layout */}
              <Route path="/admin" element={<AdminLayoutWrapper />}>
                {adminRoutes.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Property Manager routes with Layout */}
              <Route path="/property-manager" element={<PropertyManagerLayoutWrapper />}>
                {propertyManagerRoutes.map((route) => (
                  <Route
                    key={`pm-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Owner routes with Layout */}
              <Route path="/owner" element={<OwnerLayoutWrapper />}>
                {ownerRoutes.map((route) => (
                  <Route
                    key={`owner-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Tenant routes with Layout */}
              <Route path="/tenant" element={<TenantLayoutWrapper />}>
                {tenantRoutes.map((route) => (
                  <Route
                    key={`tenant-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Vendor Routes with Layout */}
              <Route path="/vendor" element={<VendorLayoutWrapper />}>
                {vendorRoutes.map((route) => (
                  <Route
                    key={`vendor-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Common routes */}
              {commonRoutes.map((route) => (
                <Route 
                  key={`common-${route.path}`}
                  path={route.path} 
                  element={route.element} 
                />
              ))}

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
