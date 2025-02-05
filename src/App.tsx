import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { commonRoutes } from "./routes/commonRoutes";
import { propertyManagerRoutes } from "./routes/propertyManagerRoutes";
import { tenantRoutes } from "./routes/tenantRoutes";
import { ownerRoutes } from "./routes/ownerRoutes";

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
              <Route key={route.path} {...route} />
            ))}
            {propertyManagerRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            {tenantRoutes.map((route) => (
              <Route key={route.element?.type?.name} {...route} />
            ))}
            {ownerRoutes.map((route) => (
              <Route key={route.element?.type?.name} {...route} />
            ))}
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;