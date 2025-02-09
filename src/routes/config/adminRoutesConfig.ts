
import { AdminRoute } from "@/types/routes";

export const dashboardRoutes: AdminRoute[] = [
  {
    key: "admin-dashboard",
    path: "dashboard",
    element: null,
    requiresAuth: true,
    title: "Dashboard",
  }
];

export const propertyRoutes: AdminRoute[] = [
  {
    key: "admin-properties",
    path: "properties",
    element: null,
    requiresAuth: true,
    title: "Properties",
  }
];

export const leaseRoutes: AdminRoute[] = [
  {
    key: "admin-leases",
    path: "leases",
    element: null,
    requiresAuth: true,
    title: "Lease Management",
  }
];

export const financialRoutes: AdminRoute[] = [
  {
    key: "admin-payments",
    path: "payments",
    element: null,
    requiresAuth: true,
    title: "Financial Management",
  }
];

export const maintenanceRoutes: AdminRoute[] = [
  {
    key: "admin-maintenance",
    path: "maintenance",
    element: null,
    requiresAuth: true,
    title: "Maintenance",
  }
];

export const reportRoutes: AdminRoute[] = [
  {
    key: "admin-reports",
    path: "reports",
    element: null,
    requiresAuth: true,
    title: "Reports & Analytics",
  }
];

export const userManagementRoutes: AdminRoute[] = [
  {
    key: "admin-users",
    path: "users",
    element: null,
    requiresAuth: true,
    title: "User Management",
  }
];

export const newsletterRoutes: AdminRoute[] = [
  {
    key: "admin-newsletters",
    path: "newsletters",
    element: null,
    requiresAuth: true,
    title: "Newsletter Management",
  }
];

export const settingsRoutes: AdminRoute[] = [
  {
    key: "admin-settings",
    path: "settings",
    element: null,
    requiresAuth: true,
    title: "Settings",
  }
];

export const messageRoutes: AdminRoute[] = [
  {
    key: "admin-messages",
    path: "messages",
    element: null,
    requiresAuth: true,
    title: "Messages",
  }
];
