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

export const tenantRoutes: RouteObject[] = [
  {
    path: "/tenant",
    element: (
      <ProtectedRoute>
        <TenantLayout />
      </ProtectedRoute>
    ),
    errorElement: <div>Error loading tenant section</div>,
    children: [
      { 
        index: true, 
        element: <TenantDashboard />,
        errorElement: <div>Error loading dashboard</div>
      },
      { 
        path: "dashboard", 
        element: <TenantDashboard />,
        errorElement: <div>Error loading dashboard</div>
      },
      { 
        path: "maintenance", 
        element: <TenantMaintenance />,
        errorElement: <div>Error loading maintenance</div>
      },
      { 
        path: "maintenance/new", 
        element: <NewMaintenanceRequest />,
        errorElement: <div>Error loading new maintenance request</div>
      },
      { 
        path: "maintenance/:id", 
        element: <MaintenanceRequestDetail />,
        errorElement: <div>Error loading maintenance details</div>
      },
      { 
        path: "payments", 
        element: <TenantPayments />,
        errorElement: <div>Error loading payments</div>
      },
      { 
        path: "payments/new", 
        element: <NewPayment />,
        errorElement: <div>Error loading new payment</div>
      },
      { 
        path: "documents", 
        element: <TenantDocuments />,
        errorElement: <div>Error loading documents</div>
      },
      { 
        path: "communications", 
        element: <TenantCommunications />,
        errorElement: <div>Error loading communications</div>
      },
      { 
        path: "communications/:id", 
        element: <TenantCommunicationDetail />,
        errorElement: <div>Error loading communication details</div>
      },
      { 
        path: "settings", 
        element: <TenantSettings />,
        errorElement: <div>Error loading settings</div>
      },
      { 
        path: "help", 
        element: <Help />,
        errorElement: <div>Error loading help</div>
      },
      { 
        path: "notifications", 
        element: <Notifications />,
        errorElement: <div>Error loading notifications</div>
      }
    ]
  }
];

// Add route change logging
if (import.meta.env.DEV) {
  window.addEventListener('popstate', () => {
    logger.info('Route changed:', window.location.pathname);
  });
}