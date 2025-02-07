import { AdminRoute } from "@/types/routes";

export const dashboardRoutes: AdminRoute[] = [
  {
    key: "admin-dashboard",
    path: "/admin/dashboard",
    element: null,
    requiresAuth: true,
    title: "Dashboard",
  }
];

export const leaseRoutes: AdminRoute[] = [
  {
    key: "admin-leases",
    path: "/admin/leases",
    element: null,
    requiresAuth: true,
    title: "Lease Management",
  }
];

export const propertyRoutes: AdminRoute[] = [
  {
    key: "admin-properties",
    path: "/admin/properties",
    element: null,
    requiresAuth: true,
    title: "Properties",
  }
];

export const financialRoutes: AdminRoute[] = [
  {
    key: "admin-payments",
    path: "/admin/payments",
    element: null,
    requiresAuth: true,
    title: "Financial Management",
  }
];

export const maintenanceRoutes: AdminRoute[] = [
  {
    key: "admin-maintenance",
    path: "/admin/maintenance",
    element: null,
    requiresAuth: true,
    title: "Maintenance",
  }
];

export const reportRoutes: AdminRoute[] = [
  {
    key: "admin-reports",
    path: "/admin/reports",
    element: null,
    requiresAuth: true,
    title: "Reports & Analytics",
  }
];

export const userManagementRoutes: AdminRoute[] = [
  {
    key: "admin-users",
    path: "/admin/users",
    element: null,
    requiresAuth: true,
    title: "User Management",
  }
];

export const newsletterRoutes: AdminRoute[] = [
  {
    key: "admin-newsletters",
    path: "/admin/newsletters",
    element: null,
    requiresAuth: true,
    title: "Newsletter Management",
  }
];

export const settingsRoutes: AdminRoute[] = [
  {
    key: "admin-settings",
    path: "/admin/settings",
    element: null,
    requiresAuth: true,
    title: "Settings",
  }
];

export const messageRoutes: AdminRoute[] = [
  {
    key: "admin-messages",
    path: "/admin/messages",
    element: null,
    requiresAuth: true,
    title: "Messages",
  }
];
