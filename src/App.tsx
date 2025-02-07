import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { commonRoutes } from "./routes/commonRoutes";
import { propertyManagerRoutes } from "./routes/propertyManagerRoutes";
import { tenantRoutes } from "./routes/tenantRoutes";
import { ownerRoutes } from "./routes/ownerRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { vendorRoutes } from "./routes/vendorRoutes";
import { ErrorBoundary } from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import { logger } from "@/utils/logger";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  // Add route change logging in development
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      const logRouteChange = () => {
        logger.info('Route changed:', window.location.pathname);
      };
      window.addEventListener('popstate', logRouteChange);
      return () => window.removeEventListener('popstate', logRouteChange);
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Common Routes */}
            {commonRoutes.map((route) => (
              <Route 
                key={`common-${route.path || 'index'}`}
                path={route.path} 
                element={route.element} 
              />
            ))}

            {/* Property Manager Routes */}
            {propertyManagerRoutes.map((route) => (
              <Route 
                key={`pm-${route.path || 'index'}`}
                path={route.path} 
                element={route.element} 
              />
            ))}

            {/* Tenant Routes */}
            {tenantRoutes.map((route) => (
              <Route
                key={`tenant-${route.path || 'index'}`}
                path={route.path}
                element={route.element}
              >
                {route.children?.map((childRoute) => (
                  <Route
                    key={`tenant-child-${childRoute.path || 'index'}`}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ))}

            {/* Owner Routes */}
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

            {/* Admin Routes */}
            {adminRoutes.map((route) => (
              <Route 
                key={`admin-${route.path}`}
                path={route.path} 
                element={route.element}
              />
            ))}

            {/* Vendor Routes */}
            {vendorRoutes.map((route) => (
              <Route
                key={`vendor-${route.path || 'index'}`}
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

            {/* 404 Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;