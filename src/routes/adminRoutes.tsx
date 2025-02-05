import { Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminFinancials from "@/pages/admin/AdminFinancials";
import AdminMaintenance from "@/pages/admin/AdminMaintenance";
import AdminLeases from "@/pages/admin/AdminLeases";
import AdminSettings from "@/pages/admin/AdminSettings";

export const adminRoutes = [
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/users",
    element: <AdminUsers />,
  },
  {
    path: "/admin/properties",
    element: <AdminProperties />,
  },
  {
    path: "/admin/financials",
    element: <AdminFinancials />,
  },
  {
    path: "/admin/maintenance",
    element: <AdminMaintenance />,
  },
  {
    path: "/admin/leases",
    element: <AdminLeases />,
  },
  {
    path: "/admin/settings",
    element: <AdminSettings />,
  },
];