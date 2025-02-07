
import { AppRoute } from "@/types/routes";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import OwnerProperties from "@/pages/owner/OwnerProperties";
import OwnerStatements from "@/pages/owner/OwnerStatements";
import OwnerDocuments from "@/pages/owner/OwnerDocuments";
import OwnerReports from "@/pages/owner/OwnerReports";
import OwnerCommunications from "@/pages/owner/OwnerCommunications";
import OwnerSettings from "@/pages/owner/OwnerSettings";
import OwnerMaintenance from "@/pages/owner/OwnerMaintenance";
import OwnerMaintenanceDetail from "@/pages/owner/OwnerMaintenanceDetail";
import OwnerPayments from "@/pages/owner/OwnerPayments";
import LeaseRenewals from "@/pages/owner/LeaseRenewals";
import Applications from "@/pages/Applications";

export const ownerRoutes: AppRoute[] = [
  {
    path: "dashboard",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "properties",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerProperties />
      </ProtectedRoute>
    ),
  },
  {
    path: "statements",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerStatements />
      </ProtectedRoute>
    ),
  },
  {
    path: "documents",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerDocuments />
      </ProtectedRoute>
    ),
  },
  {
    path: "reports",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerReports />
      </ProtectedRoute>
    ),
  },
  {
    path: "communications",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerCommunications />
      </ProtectedRoute>
    ),
  },
  {
    path: "settings",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "maintenance",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerMaintenance />
      </ProtectedRoute>
    ),
  },
  {
    path: "maintenance/:id",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerMaintenanceDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "payments",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerPayments />
      </ProtectedRoute>
    ),
  },
  {
    path: "lease-renewals",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <LeaseRenewals />
      </ProtectedRoute>
    ),
  },
  {
    path: "applications",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <Applications />
      </ProtectedRoute>
    ),
  }
];
