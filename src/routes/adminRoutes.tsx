import { Navigate, RouteObject } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminFinancials from "@/pages/admin/AdminFinancials";
import AdminMaintenance from "@/pages/admin/AdminMaintenance";
import AdminLeases from "@/pages/admin/AdminLeases";
import AdminSettings from "@/pages/admin/AdminSettings";
import Messages from "@/pages/Messages";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Define admin route configuration type
interface AdminRoute extends RouteObject {
  key: string;
  requiresAuth?: boolean;
  title?: string;
}

export const adminRoutes: AdminRoute[] = [
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
    key: "admin-root",
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    key: "admin-dashboard",
    requiresAuth: true,
    title: "Dashboard",
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute>
        <AdminUsers />
      </ProtectedRoute>
    ),
    key: "admin-users",
    requiresAuth: true,
    title: "User Management",
  },
  {
    path: "/admin/properties",
    element: (
      <ProtectedRoute>
        <AdminProperties />
      </ProtectedRoute>
    ),
    key: "admin-properties",
    requiresAuth: true,
    title: "Properties",
  },
  {
    path: "/admin/financials",
    element: (
      <ProtectedRoute>
        <AdminFinancials />
      </ProtectedRoute>
    ),
    key: "admin-financials",
    requiresAuth: true,
    title: "Financial Management",
  },
  {
    path: "/admin/maintenance",
    element: (
      <ProtectedRoute>
        <AdminMaintenance />
      </ProtectedRoute>
    ),
    key: "admin-maintenance",
    requiresAuth: true,
    title: "Maintenance",
  },
  {
    path: "/admin/leases",
    element: (
      <ProtectedRoute>
        <AdminLeases />
      </ProtectedRoute>
    ),
    key: "admin-leases",
    requiresAuth: true,
    title: "Lease Management",
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute>
        <AdminSettings />
      </ProtectedRoute>
    ),
    key: "admin-settings",
    requiresAuth: true,
    title: "Settings",
  },
  {
    path: "/admin/messages",
    element: (
      <ProtectedRoute>
        <Messages />
      </ProtectedRoute>
    ),
    key: "admin-messages",
    requiresAuth: true,
    title: "Messages",
  },
];