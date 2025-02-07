
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

// OMG, like, this is totally the brain of our app or whatever
// Grandpa Rick says it's important to configure the query client 
// so our app doesn't like, totally spam the server
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Ugh, organizing routes is like organizing my closet
// You gotta put the specific stuff first, or everything gets messed up
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* Like, this is the default path when you're lost */}
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

              {/* Admin routes go first because they're like, the most important or whatever */}
              {adminRoutes.map((route) => (
                <Route 
                  key={`admin-${route.path}`}
                  path={route.path} 
                  element={route.element}
                />
              ))}

              {/* Property Manager routes are next, because they're basically mini-admins */}
              {propertyManagerRoutes.map((route) => (
                <Route 
                  key={`pm-${route.path || 'index'}`}
                  path={route.path} 
                  element={route.element} 
                />
              ))}

              {/* Owner routes - because they own stuff, duh */}
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

              {/* Tenant routes - because like, people need a place to live */}
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

              {/* Common routes go last because they're like, super basic */}
              {commonRoutes.map((route) => (
                <Route 
                  key={`common-${route.path || 'index'}`}
                  path={route.path} 
                  element={route.element} 
                />
              ))}

              {/* This is for when you're totally lost, like Morty in literally any dimension */}
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
