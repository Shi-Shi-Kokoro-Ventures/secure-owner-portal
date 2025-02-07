
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
import { RootRedirect } from "./components/routing/RootRedirect";
import { ProtectedPortalRoute } from "./components/routing/ProtectedPortalRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
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
              <Route path="/" element={<RootRedirect />} />
              <Route path="/login" element={<Login />} />
              
              <ProtectedPortalRoute 
                path="/owner" 
                role="owner" 
                routes={ownerRoutes} 
              />
              
              <ProtectedPortalRoute 
                path="/admin" 
                role="admin" 
                routes={adminRoutes} 
              />
              
              <ProtectedPortalRoute 
                path="/property-manager" 
                role="property_manager" 
                routes={propertyManagerRoutes} 
              />
              
              <ProtectedPortalRoute 
                path="/tenant" 
                role="tenant" 
                routes={tenantRoutes} 
              />
              
              <ProtectedPortalRoute 
                path="/vendor" 
                role="vendor" 
                routes={vendorRoutes} 
              />

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
