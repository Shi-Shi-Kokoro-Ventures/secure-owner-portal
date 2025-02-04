import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import TenantMaintenance from "@/pages/tenant/TenantMaintenance";
import NewMaintenanceRequest from "@/pages/tenant/NewMaintenanceRequest";
import WorkOrders from "@/pages/WorkOrders";
import { AddPropertyForm } from "@/components/AddPropertyForm";
import { PlaceNewTenant } from "@/components/PlaceNewTenant";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkOrders />} />
        <Route path="/properties/add" element={<AddPropertyForm />} />
        <Route path="/tenant/place" element={<PlaceNewTenant />} />
        <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
        <Route path="/tenant/maintenance/new" element={<NewMaintenanceRequest />} />
      </Routes>
      <Toaster />
    </Router>
  );
}