import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import OwnerLayout from "@/components/OwnerLayout";
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

export const ownerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute><OwnerLayout /></ProtectedRoute>,
    children: [
      { path: "/owner/dashboard", element: <OwnerDashboard /> },
      { path: "/owner/properties", element: <OwnerProperties /> },
      { path: "/owner/statements", element: <OwnerStatements /> },
      { path: "/owner/documents", element: <OwnerDocuments /> },
      { path: "/owner/reports", element: <OwnerReports /> },
      { path: "/owner/communications", element: <OwnerCommunications /> },
      { path: "/owner/settings", element: <OwnerSettings /> },
      { path: "/owner/maintenance", element: <OwnerMaintenance /> },
      { path: "/owner/maintenance/:id", element: <OwnerMaintenanceDetail /> },
      { path: "/owner/payments", element: <OwnerPayments /> },
      { path: "/owner/lease-renewals", element: <LeaseRenewals /> },
      { path: "/owner/applications", element: <Applications /> }
    ]
  }
];