import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TenantLayout } from "@/components/TenantLayout";
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
import { logger } from "@/utils/logger";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Wrap component with error boundary
const withErrorBoundary = (Component: React.ComponentType<any>) => {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
};

export const tenantRoutes: RouteObject[] = [
  {
    path: "/tenant",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <TenantLayout />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    errorElement: <div>Error loading tenant section</div>,
    children: [
      {
        index: true,
        element: withErrorBoundary(TenantDashboard),
      },
      {
        path: "dashboard",
        element: withErrorBoundary(TenantDashboard),
      },
      {
        path: "maintenance",
        element: withErrorBoundary(TenantMaintenance),
      },
      {
        path: "maintenance/new",
        element: withErrorBoundary(NewMaintenanceRequest),
      },
      {
        path: "maintenance/:id",
        element: withErrorBoundary(MaintenanceRequestDetail),
      },
      {
        path: "payments",
        element: withErrorBoundary(TenantPayments),
      },
      {
        path: "payments/new",
        element: withErrorBoundary(NewPayment),
      },
      {
        path: "documents",
        element: withErrorBoundary(TenantDocuments),
      },
      {
        path: "communications",
        element: withErrorBoundary(TenantCommunications),
      },
      {
        path: "communications/:id",
        element: withErrorBoundary(TenantCommunicationDetail),
      },
      {
        path: "settings",
        element: withErrorBoundary(TenantSettings),
      },
      {
        path: "help",
        element: withErrorBoundary(Help),
      },
      {
        path: "notifications",
        element: withErrorBoundary(Notifications),
      },
    ],
  },
];

// Add route change logging in development
if (import.meta.env.DEV) {
  window.addEventListener('popstate', () => {
    logger.info('Route changed:', window.location.pathname);
  });
}