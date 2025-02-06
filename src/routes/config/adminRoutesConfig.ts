import { AdminRoute } from "@/types/routes";

export const dashboardRoutes: AdminRoute[] = [
  {
    key: "admin-dashboard",
    path: "/admin/dashboard",
    requiresAuth: true,
    title: "Dashboard",
  }
];

export const leaseRoutes: AdminRoute[] = [
  {
    key: "admin-leases",
    path: "/admin/leases",
    requiresAuth: true,
    title: "Lease Management",
  }
];

export const propertyRoutes: AdminRoute[] = [
  {
    key: "admin-properties",
    path: "/admin/properties",
    requiresAuth: true,
    title: "Properties",
  }
];

export const financialRoutes: AdminRoute[] = [
  {
    key: "admin-payments",
    path: "/admin/payments",
    requiresAuth: true,
    title: "Financial Management",
  }
];

export const maintenanceRoutes: AdminRoute[] = [
  {
    key: "admin-maintenance",
    path: "/admin/maintenance",
    requiresAuth: true,
    title: "Maintenance",
  }
];

export const reportRoutes: AdminRoute[] = [
  {
    key: "admin-reports",
    path: "/admin/reports",
    requiresAuth: true,
    title: "Reports & Analytics",
  }
];

export const userManagementRoutes: AdminRoute[] = [
  {
    key: "admin-users",
    path: "/admin/users",
    requiresAuth: true,
    title: "User Management",
  }
];

export const settingsRoutes: AdminRoute[] = [
  {
    key: "admin-settings",
    path: "/admin/settings",
    requiresAuth: true,
    title: "Settings",
  }
];