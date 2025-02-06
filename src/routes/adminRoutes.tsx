import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Loader2 } from "lucide-react";
import {
  dashboardRoutes,
  leaseRoutes,
  propertyRoutes,
  financialRoutes,
  maintenanceRoutes,
  reportRoutes,
  userManagementRoutes,
  settingsRoutes,
} from "./config/adminRoutesConfig";
import { AdminRoute } from "@/types/routes";

// Lazy load components
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminProperties = lazy(() => import("@/pages/admin/AdminProperties"));
const AdminFinancials = lazy(() => import("@/pages/admin/AdminFinancials"));
const AdminMaintenance = lazy(() => import("@/pages/admin/AdminMaintenance"));
const AdminLeases = lazy(() => import("@/pages/admin/AdminLeases"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminReports = lazy(() => import("@/pages/admin/AdminReports"));

// Loading component for suspense fallback
const LoadingComponent = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

// Helper function to wrap component with ProtectedRoute and Suspense
const wrapComponent = (Component: React.ComponentType) => (
  <ProtectedRoute>
    <Suspense fallback={<LoadingComponent />}>
      <Component />
    </Suspense>
  </ProtectedRoute>
);

// Map route configurations to actual routes with components
const mapRouteConfig = (config: AdminRoute): AdminRoute => {
  switch (config.key) {
    case "admin-dashboard":
      return { ...config, element: wrapComponent(AdminDashboard) };
    case "admin-users":
      return { ...config, element: wrapComponent(AdminUsers) };
    case "admin-properties":
      return { ...config, element: wrapComponent(AdminProperties) };
    case "admin-payments":
      return { ...config, element: wrapComponent(AdminFinancials) };
    case "admin-maintenance":
      return { ...config, element: wrapComponent(AdminMaintenance) };
    case "admin-leases":
      return { ...config, element: wrapComponent(AdminLeases) };
    case "admin-settings":
      return { ...config, element: wrapComponent(AdminSettings) };
    case "admin-reports":
      return { ...config, element: wrapComponent(AdminReports) };
    default:
      return config;
  }
};

// Combine all routes
export const adminRoutes: AdminRoute[] = [
  {
    key: "admin-root",
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  ...dashboardRoutes,
  ...leaseRoutes,
  ...propertyRoutes,
  ...financialRoutes,
  ...maintenanceRoutes,
  ...reportRoutes,
  ...userManagementRoutes,
  ...settingsRoutes,
].map(mapRouteConfig);