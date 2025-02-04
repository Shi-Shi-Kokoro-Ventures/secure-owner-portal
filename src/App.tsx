import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TenantMaintenance from "@/pages/tenant/TenantMaintenance";
import NewMaintenanceRequest from "@/pages/tenant/NewMaintenanceRequest";
import TenantDashboard from "@/pages/tenant/TenantDashboard";
import TenantPayments from "@/pages/tenant/TenantPayments";
import NewPayment from "@/pages/tenant/NewPayment";
import TenantDocuments from "@/pages/tenant/TenantDocuments";
import TenantCommunications from "@/pages/tenant/TenantCommunications";
import TenantSettings from "@/pages/tenant/TenantSettings";
import WorkOrders from "@/pages/WorkOrders";
import { AddPropertyForm } from "@/components/AddPropertyForm";
import { PlaceNewTenant } from "@/components/PlaceNewTenant";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Owners from "@/pages/Owners";
import Properties from "@/pages/Properties";
import Tenants from "@/pages/Tenants";
import Reports from "@/pages/Reports";
import Banking from "@/pages/Banking";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import TenantLayout from "@/components/TenantLayout";
import TenantCommunicationDetail from "@/pages/tenant/TenantCommunicationDetail";

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Property Manager routes - protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owners"
            element={
              <ProtectedRoute>
                <Owners />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <Properties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties/add"
            element={
              <ProtectedRoute>
                <AddPropertyForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenants"
            element={
              <ProtectedRoute>
                <Tenants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant/place"
            element={
              <ProtectedRoute>
                <PlaceNewTenant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/work-orders"
            element={
              <ProtectedRoute>
                <WorkOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/banking"
            element={
              <ProtectedRoute>
                <Banking />
              </ProtectedRoute>
            }
          />

          {/* Tenant routes */}
          <Route element={<TenantLayout />}>
            <Route path="/tenant/dashboard" element={<TenantDashboard />} />
            <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
            <Route
              path="/tenant/maintenance/new"
              element={<NewMaintenanceRequest />}
            />
            <Route path="/tenant/payments" element={<TenantPayments />} />
            <Route path="/tenant/payments/new" element={<NewPayment />} />
            <Route path="/tenant/documents" element={<TenantDocuments />} />
            <Route
              path="/tenant/communications"
              element={<TenantCommunications />}
            />
            <Route
              path="/tenant/communications/:id"
              element={<TenantCommunicationDetail />}
            />
            <Route path="/tenant/settings" element={<TenantSettings />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}
