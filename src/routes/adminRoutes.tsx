import { Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminFinancials from "@/pages/admin/AdminFinancials";
import AdminMaintenance from "@/pages/admin/AdminMaintenance";
import AdminLeases from "@/pages/admin/AdminLeases";
import AdminSettings from "@/pages/admin/AdminSettings";
import Messages from "@/pages/Messages";

export const adminRoutes = [
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
    key: "admin-root"
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    key: "admin-dashboard"
  },
  {
    path: "/admin/users",
    element: <AdminUsers />,
    key: "admin-users"
  },
  {
    path: "/admin/properties",
    element: <AdminProperties />,
    key: "admin-properties"
  },
  {
    path: "/admin/financials",
    element: <AdminFinancials />,
    key: "admin-financials"
  },
  {
    path: "/admin/maintenance",
    element: <AdminMaintenance />,
    key: "admin-maintenance"
  },
  {
    path: "/admin/leases",
    element: <AdminLeases />,
    key: "admin-leases"
  },
  {
    path: "/admin/settings",
    element: <AdminSettings />,
    key: "admin-settings"
  },
  {
    path: "/admin/messages",
    element: <Messages />,
    key: "admin-messages"
  },
];