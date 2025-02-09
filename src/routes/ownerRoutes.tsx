
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
    path: "/owner",
    element: <ProtectedRoute requiredRole="owner"><OwnerLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <OwnerDashboard /> },
      { path: "dashboard", element: <OwnerDashboard /> },
      { path: "properties", element: <OwnerProperties /> },
      { path: "statements", element: <OwnerStatements /> },
      { path: "documents", element: <OwnerDocuments /> },
      { path: "reports", element: <OwnerReports /> },
      { path: "communications", element: <OwnerCommunications /> },
      { path: "settings", element: <OwnerSettings /> },
      { path: "maintenance", element: <OwnerMaintenance /> },
      { path: "maintenance/:id", element: <OwnerMaintenanceDetail /> },
      { path: "payments", element: <OwnerPayments /> },
      { path: "lease-renewals", element: <LeaseRenewals /> },
      { path: "applications", element: <Applications /> }
    ]
  }
];
