
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
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {commonRoutes.map((route) => (
              <Route 
                key={route.path || 'index'} 
                path={route.path} 
                element={route.element}
                index={route.index}
              />
            ))}
            {propertyManagerRoutes.map((route) => (
              <Route 
                key={route.path || 'pm-index'} 
                path={route.path} 
                element={route.element}
                index={route.index}
              />
            ))}
            {tenantRoutes.map((route) => (
              <Route 
                key={route.path || 'tenant-index'} 
                path={route.path} 
                element={route.element}
                index={route.index}
              />
            ))}
            {ownerRoutes.map((route) => (
              <Route 
                key={route.path || 'owner-index'} 
                path={route.path} 
                element={route.element}
                index={route.index}
              />
            ))}
            {adminRoutes.map((route) => (
              <Route 
                key={route.path || 'admin-index'} 
                path={route.path} 
                element={route.element}
                index={route.index}
              />
            ))}
            {vendorRoutes.map((route) => (
              <Route 
                key={route.path || 'vendor-index'} 
                path={route.path} 
                element={route.element}
                children={route.children?.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element}
                    index={childRoute.index}
                  />
                ))}
              />
            ))}
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
