import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import TenantMaintenance from "@/pages/tenant/TenantMaintenance";
import NewMaintenanceRequest from "@/pages/tenant/NewMaintenanceRequest";
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

export default function App() {
  return (
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
        <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
        <Route path="/tenant/maintenance/new" element={<NewMaintenanceRequest />} />
      </Routes>
      <Toaster />
    </Router>
  );
}