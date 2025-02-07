
import { AppRoute } from "@/types/routes";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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

export const tenantRoutes: AppRoute[] = [
  {
    path: "dashboard",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "maintenance",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantMaintenance />
      </ProtectedRoute>
    ),
  },
  {
    path: "maintenance/new",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <NewMaintenanceRequest />
      </ProtectedRoute>
    ),
  },
  {
    path: "maintenance/:id",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <MaintenanceRequestDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "payments",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantPayments />
      </ProtectedRoute>
    ),
  },
  {
    path: "payments/new",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <NewPayment />
      </ProtectedRoute>
    ),
  },
  {
    path: "documents",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantDocuments />
      </ProtectedRoute>
    ),
  },
  {
    path: "communications",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantCommunications />
      </ProtectedRoute>
    ),
  },
  {
    path: "communications/:id",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantCommunicationDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "settings",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "help",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <Help />
      </ProtectedRoute>
    ),
  },
  {
    path: "notifications",
    element: (
      <ProtectedRoute allowedRoles={["tenant"]}>
        <Notifications />
      </ProtectedRoute>
    ),
  },
];
