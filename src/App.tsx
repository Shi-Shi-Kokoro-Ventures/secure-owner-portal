
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
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
import { useToast } from "./hooks/use-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Enhanced RootRedirect component with proper authentication handling
const RootRedirect = () => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Handle unauthenticated users
  if (!user) {
    // Save the attempted URL for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Handle authenticated users without a profile
  if (!userProfile) {
    toast({
      title: "Profile Error",
      description: "Unable to load user profile. Please try logging in again.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  // Role-based redirects with proper error handling
  switch (userProfile.role) {
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
      toast({
        title: "Invalid Role",
        description: "Your user account has an invalid role. Please contact support.",
        variant: "destructive",
      });
      return <Navigate to="/login" replace />;
  }
};

// Layout wrapper components with proper role protection
const AdminLayoutWrapper = () => {
  const { userProfile } = useAuth();
  return userProfile?.role === 'admin' ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

const PropertyManagerLayoutWrapper = () => {
  const { userProfile } = useAuth();
  return userProfile?.role === 'property_manager' ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

const OwnerLayoutWrapper = () => {
  const { userProfile } = useAuth();
  return userProfile?.role === 'owner' ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

const TenantLayoutWrapper = () => {
  const { userProfile } = useAuth();
  return userProfile?.role === 'tenant' ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

const VendorLayoutWrapper = () => {
  const { userProfile } = useAuth();
  return userProfile?.role === 'vendor' ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* Root redirect with enhanced auth check */}
              <Route path="/" element={<RootRedirect />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />

              {/* Admin routes with Layout and role protection */}
              <Route path="/admin" element={<AdminLayoutWrapper />}>
                {adminRoutes.map((route) => (
                  <Route
                    key={`admin-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Property Manager routes with Layout and role protection */}
              <Route path="/property-manager" element={<PropertyManagerLayoutWrapper />}>
                {propertyManagerRoutes.map((route) => (
                  <Route
                    key={`pm-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Owner routes with Layout and role protection */}
              <Route path="/owner" element={<OwnerLayoutWrapper />}>
                {ownerRoutes.map((route) => (
                  <Route
                    key={`owner-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Tenant routes with Layout and role protection */}
              <Route path="/tenant" element={<TenantLayoutWrapper />}>
                {tenantRoutes.map((route) => (
                  <Route
                    key={`tenant-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Vendor Routes with Layout and role protection */}
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
