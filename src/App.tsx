import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TenantMaintenance from "@/pages/tenant/TenantMaintenance";
import NewMaintenanceRequest from "@/pages/tenant/NewMaintenanceRequest";
import MaintenanceRequestDetail from "@/pages/tenant/MaintenanceRequestDetail";
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
import NotFound from "@/pages/NotFound";
import OwnerLayout from "@/components/OwnerLayout";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import OwnerProperties from "@/pages/owner/OwnerProperties";
import OwnerStatements from "@/pages/owner/OwnerStatements";
import OwnerDocuments from "@/pages/owner/OwnerDocuments";
import OwnerReports from "@/pages/owner/OwnerReports";
import OwnerCommunications from "@/pages/owner/OwnerCommunications";
import OwnerSettings from "@/pages/owner/OwnerSettings";
import OwnerMaintenance from "@/pages/owner/OwnerMaintenance";
import OwnerPayments from "@/pages/owner/OwnerPayments";
import OwnerMaintenanceDetail from "@/pages/owner/OwnerMaintenanceDetail";
import Notifications from "@/pages/Notifications";
import Help from "@/pages/Help";

// Create a new QueryClient instance outside of the component
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
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Common protected routes */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />

          {/* Property Manager routes - protected */}
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

          {/* Owner routes - protected and wrapped in OwnerLayout */}
          <Route
            element={
              <ProtectedRoute>
                <OwnerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/properties" element={<OwnerProperties />} />
            <Route path="/owner/statements" element={<OwnerStatements />} />
            <Route path="/owner/documents" element={<OwnerDocuments />} />
            <Route path="/owner/reports" element={<OwnerReports />} />
            <Route path="/owner/communications" element={<OwnerCommunications />} />
            <Route path="/owner/settings" element={<OwnerSettings />} />
            <Route path="/owner/maintenance" element={<OwnerMaintenance />} />
            <Route path="/owner/maintenance/:id" element={<OwnerMaintenanceDetail />} />
            <Route path="/owner/payments" element={<OwnerPayments />} />
          </Route>

          {/* Tenant routes - protected and wrapped in TenantLayout */}
          <Route
            element={
              <ProtectedRoute>
                <TenantLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/tenant/dashboard" element={<TenantDashboard />} />
            <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
            <Route
              path="/tenant/maintenance/new"
              element={<NewMaintenanceRequest />}
            />
            <Route
              path="/tenant/maintenance/:id"
              element={<MaintenanceRequestDetail />}
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

          {/* Catch all route for 404 */}
          <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
