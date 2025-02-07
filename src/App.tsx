
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Root redirect component that handles authentication
const RootRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/admin/dashboard" replace />;
};

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

              {/* Admin routes */}
              {adminRoutes.map((route) => (
                <Route 
                  key={route.key}
                  path={`/admin${route.path === '/admin' ? '' : route.path}`}
                  element={route.element}
                />
              ))}

              {/* Property Manager routes */}
              <Route path="/property-manager">
                {propertyManagerRoutes.map((route) => (
                  <Route
                    key={`pm-${route.path}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>

              {/* Owner routes */}
              <Route path="/owner">
                {ownerRoutes.map((route) => (
                  <Route
                    key={`owner-${route.path}`}
                    path={route.path}
                    element={route.element}
                  >
                    {route.children?.map((childRoute) => (
                      <Route
                        key={`owner-child-${childRoute.path}`}
                        path={childRoute.path}
                        element={childRoute.element}
                      />
                    ))}
                  </Route>
                ))}
              </Route>

              {/* Tenant routes */}
              <Route path="/tenant">
                {tenantRoutes.map((route) => (
                  <Route
                    key={`tenant-${route.path}`}
                    path={route.path}
                    element={route.element}
                  >
                    {route.children?.map((childRoute) => (
                      <Route
                        key={`tenant-child-${childRoute.path}`}
                        path={childRoute.path}
                        element={childRoute.element}
                      />
                    ))}
                  </Route>
                ))}
              </Route>

              {/* Vendor Routes */}
              <Route path="/vendor">
                {vendorRoutes.map((route) => (
                  <Route
                    key={`vendor-${route.path}`}
                    path={route.path}
                    element={route.element}
                  >
                    {route.children?.map((childRoute) => (
                      <Route
                        key={`vendor-child-${childRoute.path}`}
                        path={childRoute.path}
                        element={childRoute.element}
                      />
                    ))}
                  </Route>
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
