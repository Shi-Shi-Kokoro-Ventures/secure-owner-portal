
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
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { TenantLayout } from "./components/TenantLayout";
import { RootRedirect } from "./components/routing/RootRedirect";
import TenantServices from "./pages/TenantServices";
import Tenants from "./pages/Tenants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/tenant-services" element={<TenantServices />} />
              
              {/* Root redirects */}
              <Route path="/" element={<RootRedirect />} />
              <Route path="/dashboard" element={<RootRedirect />} />
              
              {/* Add Tenants route */}
              <Route 
                path="/tenants" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Tenants />
                    </Layout>
                  </ProtectedRoute>
                } 
              />

              {/* Common routes accessible to all authenticated users */}
              {commonRoutes.map((route) => (
                <Route 
                  key={`common-${route.path}`}
                  path={route.path} 
                  element={route.element} 
                />
              ))}

              {/* Owner routes */}
              <Route
                path="/owner/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        {ownerRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path.replace('owner/', '')}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Admin routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        {adminRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path.replace('admin/', '')}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Property Manager routes */}
              <Route
                path="/property-manager/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        {propertyManagerRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path.replace('property-manager/', '')}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Tenant routes */}
              <Route
                path="/tenant/*"
                element={
                  <ProtectedRoute>
                    <TenantLayout>
                      <Routes>
                        {tenantRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path.replace('tenant/', '')}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </TenantLayout>
                  </ProtectedRoute>
                }
              />

              {/* Vendor routes */}
              <Route
                path="/vendor/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        {vendorRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path.replace('vendor/', '')}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Reports redirect */}
              <Route 
                path="/reports" 
                element={<Navigate to="/admin/reports" replace />} 
              />

              {/* Catch all route for 404 */}
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
