
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Index from "./pages/Index";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { RootRedirect } from "./components/routing/RootRedirect";

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
              {/* Root redirect handler */}
              <Route path="/" element={<RootRedirect />} />
              
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Portal routes */}
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
              
              <Route
                path="/admin/*"
                element={
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
                }
              />
              
              <Route
                path="/property-manager/*"
                element={
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
                }
              />
              
              <Route
                path="/tenant/*"
                element={
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
                }
              />
              
              <Route
                path="/vendor/*"
                element={
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
                }
              />

              {/* Common routes accessible to all authenticated users */}
              {commonRoutes.map((route) => (
                <Route 
                  key={`common-${route.path}`}
                  path={route.path} 
                  element={<ProtectedRoute>{route.element}</ProtectedRoute>} 
                />
              ))}

              {/* Catch invalid routes */}
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
