
import { AppRoute } from "@/types/routes";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Owners from "@/pages/Owners";
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
import OwnerSignatures from "@/pages/OwnerSignatures";

export const ownerRoutes: AppRoute[] = [
  {
    path: "owner/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/properties",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerProperties />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/statements",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerStatements />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/documents",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerDocuments />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/reports",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerReports />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/communications",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerCommunications />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/settings",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/maintenance",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerMaintenance />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/maintenance/:id",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerMaintenanceDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/payments",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerPayments />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/lease-renewals",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <LeaseRenewals />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/applications",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <Applications />
      </ProtectedRoute>
    ),
  },
  {
    path: "owner/signatures",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerSignatures />
      </ProtectedRoute>
    ),
  }
];
