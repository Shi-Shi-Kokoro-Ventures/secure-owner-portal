
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

// Separate route configuration from access control
const createOwnerRoute = (path: string, Component: React.ComponentType): AppRoute => ({
  path,
  element: (
    <ProtectedRoute 
      allowedRoles={["owner"]}
      requireAuth={true}
      redirectTo="/login"
    >
      <Component />
    </ProtectedRoute>
  ),
});

// Define owner-specific routes
export const ownerRoutes: AppRoute[] = [
  createOwnerRoute("owner/dashboard", OwnerDashboard),
  createOwnerRoute("owner/properties", OwnerProperties),
  createOwnerRoute("owner/statements", OwnerStatements),
  createOwnerRoute("owner/documents", OwnerDocuments),
  createOwnerRoute("owner/reports", OwnerReports),
  createOwnerRoute("owner/communications", OwnerCommunications),
  createOwnerRoute("owner/settings", OwnerSettings),
  createOwnerRoute("owner/maintenance", OwnerMaintenance),
  createOwnerRoute("owner/maintenance/:id", OwnerMaintenanceDetail),
  createOwnerRoute("owner/payments", OwnerPayments),
  createOwnerRoute("owner/lease-renewals", LeaseRenewals),
  createOwnerRoute("owner/applications", Applications),
  createOwnerRoute("owner/signatures", OwnerSignatures),
];
