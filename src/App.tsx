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

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Property Manager routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/add" element={<AddPropertyForm />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/tenant/place" element={<PlaceNewTenant />} />
        <Route path="/work-orders" element={<WorkOrders />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/banking" element={<Banking />} />

        {/* Tenant routes */}
        <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
        <Route path="/tenant/maintenance/new" element={<NewMaintenanceRequest />} />
      </Routes>
      <Toaster />
    </Router>
  );
}