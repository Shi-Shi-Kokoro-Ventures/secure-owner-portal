import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Owners from "./pages/Owners";
import Properties from "./pages/Properties";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/owners" replace />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/tenant-signatures" element={<NotFound />} />
          <Route path="/tenant-archives" element={<NotFound />} />
          <Route path="/banking" element={<NotFound />} />
          <Route path="/owner-signatures" element={<NotFound />} />
          <Route path="/owner-archives" element={<NotFound />} />
          <Route path="/reports" element={<NotFound />} />
          <Route path="/mailing" element={<NotFound />} />
          <Route path="/tenants" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;