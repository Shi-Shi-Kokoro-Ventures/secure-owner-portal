import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Owners from "./pages/Owners";
import Properties from "./pages/Properties";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Banking from "./pages/Banking";
import TenantSignatures from "./pages/TenantSignatures";
import TenantArchives from "./pages/TenantArchives";
import OwnerSignatures from "./pages/OwnerSignatures";
import OwnerArchives from "./pages/OwnerArchives";
import Reports from "./pages/Reports";
import Mailing from "./pages/Mailing";
import Tenants from "./pages/Tenants";
import Applications from "./pages/Applications";
import Inspections from "./pages/Inspections";
import WorkOrders from "./pages/WorkOrders";
import PropertyArchives from "./pages/PropertyArchives";
import { PlaceNewTenant } from "./components/PlaceNewTenant";
import Files from "./pages/Files";
import Statements from "./pages/Statements";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import TenantDashboard from "./pages/tenant/TenantDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/place-new-tenant" element={<PlaceNewTenant />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/tenant-signatures" element={<TenantSignatures />} />
          <Route path="/tenant-archives" element={<TenantArchives />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/owner-signatures" element={<OwnerSignatures />} />
          <Route path="/owner-archives" element={<OwnerArchives />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/mailing" element={<Mailing />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/property-archives" element={<PropertyArchives />} />
          <Route path="/files" element={<Files />} />
          <Route path="/statements" element={<Statements />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
