import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import TenantLayout from "@/components/TenantLayout";
import TenantDashboard from "@/pages/tenant/TenantDashboard";
import TenantMaintenance from "@/pages/tenant/TenantMaintenance";
import NewMaintenanceRequest from "@/pages/tenant/NewMaintenanceRequest";
import MaintenanceRequestDetail from "@/pages/tenant/MaintenanceRequestDetail";
import TenantPayments from "@/pages/tenant/TenantPayments";
import NewPayment from "@/pages/tenant/NewPayment";
import TenantDocuments from "@/pages/tenant/TenantDocuments";
import TenantCommunications from "@/pages/tenant/TenantCommunications";
import TenantCommunicationDetail from "@/pages/tenant/TenantCommunicationDetail";
import TenantSettings from "@/pages/tenant/TenantSettings";
import Help from "@/pages/Help";
import Notifications from "@/pages/Notifications";

export const tenantRoutes: RouteObject[] = [
  {
    path: "/tenant",
    element: <ProtectedRoute><TenantLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <TenantDashboard /> },
      { path: "dashboard", element: <TenantDashboard /> },
      { path: "maintenance", element: <TenantMaintenance /> },
      { path: "maintenance/new", element: <NewMaintenanceRequest /> },
      { path: "maintenance/:id", element: <MaintenanceRequestDetail /> },
      { path: "payments", element: <TenantPayments /> },
      { path: "payments/new", element: <NewPayment /> },
      { path: "documents", element: <TenantDocuments /> },
      { path: "communications", element: <TenantCommunications /> },
      { path: "communications/:id", element: <TenantCommunicationDetail /> },
      { path: "settings", element: <TenantSettings /> },
      { path: "help", element: <Help /> },
      { path: "notifications", element: <Notifications /> }
    ]
  }
];