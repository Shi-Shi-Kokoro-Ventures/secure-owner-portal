import { Navigate, RouteObject } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminFinancials from "@/pages/admin/AdminFinancials";
import AdminMaintenance from "@/pages/admin/AdminMaintenance";
import AdminLeases from "@/pages/admin/AdminLeases";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminReports from "@/pages/admin/AdminReports";
import { ProtectedRoute } from "@/components/ProtectedRoute";

type AdminRoute = RouteObject & {
  key: string;
  requiresAuth?: boolean;
  title?: string;
};

export const adminRoutes: AdminRoute[] = [
  {
    key: "admin-root",
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    key: "admin-dashboard",
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    requiresAuth: true,
    title: "Dashboard",
  },
  {
    key: "admin-leases",
    path: "/admin/leases",
    element: (
      <ProtectedRoute>
        <AdminLeases />
      </ProtectedRoute>
    ),
    requiresAuth: true,
    title: "Lease Management",
  },
  {
    key: "admin-properties",
    path: "/admin/properties",
    element: (
      <ProtectedRoute>
        <AdminProperties />
      </ProtectedRoute>
    ),
    requiresAuth: true,
    title: "Properties",
  },
  {
    key: "admin-payments",
    path: "/admin/payments",
    element: (
      <ProtectedRoute>
        <AdminFinancials />
      </ProtectedRoute>
    ),
    requiresAuth: true,
    title: "Financial Management",
  },
  {
    key: "admin-maintenance",
    path: "/admin/maintenance",
    element: (
      <ProtectedRoute>
        <AdminMaintenance />
      </ProtectedRoute>
    ),
    requiresAuth: true,
    title: "Maintenance",
  },
  {
    key: "admin-reports",
    path: "/admin/reports",
    element: (
      <ProtectedRoute>
        <AdminReports />
      </ProtectedRoute>
    ),
    requiresAuth: true,
    title: "Reports & Analytics",
  },
  {
    key: "admin-users",
    path: "/admin/users",
    element: (
      <ProtectedRoute>
        <AdminUsers />
      </ProtectedRoute>
    ),
    requiresAuth: true,
    title: "User Management",
  },
  {
    key: "admin-settings",
    path: "/admin/settings",
    element: (
      <ProtectedRoute>
        <AdminSettings />
      </ProtectedRoute>
    ),
    requiresAuth: true,
    title: "Settings",
  },
];