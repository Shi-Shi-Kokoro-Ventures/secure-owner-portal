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
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const RootRedirect = () => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!userProfile) {
    toast({
      title: "Profile Error",
      description: "Unable to load user profile. Please try logging in again.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  if (userProfile.role === 'special_admin') {
    const path = location.pathname;
    if (path.startsWith('/admin') || 
        path.startsWith('/owner') || 
        path.startsWith('/tenant') || 
        path.startsWith('/vendor') || 
        path.startsWith('/property-manager')) {
      return null; // Allow them to access the requested portal
    }
    return <Navigate to="/admin/dashboard" replace />;
  }

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

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<RootRedirect />} />

              <Route path="/login" element={<Login />} />

              <Route 
                path="/owner/*" 
                element={
                  <ProtectedRoute allowedRoles={["owner"]}>
                    <Layout>
                      <Routes>
                        {ownerRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Layout>
                    <Routes>
                      {adminRoutes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/property-manager/*" element={
                <ProtectedRoute allowedRoles={["property_manager"]}>
                  <Layout>
                    <Routes>
                      {propertyManagerRoutes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/tenant/*" element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <Layout>
                    <Routes>
                      {tenantRoutes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/vendor/*" element={
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <Layout>
                    <Routes>
                      {vendorRoutes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />

              {commonRoutes.map((route) => (
                <Route 
                  key={`common-${route.path}`}
                  path={route.path} 
                  element={route.element} 
                />
              ))}

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
