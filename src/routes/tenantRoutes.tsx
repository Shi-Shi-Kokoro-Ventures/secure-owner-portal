
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
    element: <ProtectedRoute requiredRole="tenant"><TenantLayout /></ProtectedRoute>,
    children: [
      { path: "/tenant/dashboard", element: <TenantDashboard /> },
      { path: "/tenant/maintenance", element: <TenantMaintenance /> },
      { path: "/tenant/maintenance/new", element: <NewMaintenanceRequest /> },
      { path: "/tenant/maintenance/:id", element: <MaintenanceRequestDetail /> },
      { path: "/tenant/payments", element: <TenantPayments /> },
      { path: "/tenant/payments/new", element: <NewPayment /> },
      { path: "/tenant/documents", element: <TenantDocuments /> },
      { path: "/tenant/communications", element: <TenantCommunications /> },
      { path: "/tenant/communications/:id", element: <TenantCommunicationDetail /> },
      { path: "/tenant/settings", element: <TenantSettings /> },
      { path: "/tenant/help", element: <Help /> },
      { path: "/tenant/notifications", element: <Notifications /> }
    ]
  }
];
