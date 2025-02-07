
import { AppRoute } from "@/types/routes";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Tenants from "@/pages/Tenants";
import WorkOrders from "@/pages/WorkOrders";
import Reports from "@/pages/Reports";
import Dashboard from "@/pages/Dashboard";

export const propertyManagerRoutes: AppRoute[] = [
  {
    path: "dashboard",
    element: (
      <ProtectedRoute allowedRoles={["property_manager"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "tenants",
    element: (
      <ProtectedRoute allowedRoles={["property_manager"]}>
        <Tenants />
      </ProtectedRoute>
    ),
  },
  {
    path: "work-orders",
    element: (
      <ProtectedRoute allowedRoles={["property_manager"]}>
        <WorkOrders />
      </ProtectedRoute>
    ),
  },
  {
    path: "reports",
    element: (
      <ProtectedRoute allowedRoles={["property_manager"]}>
        <Reports />
      </ProtectedRoute>
    ),
  }
];
