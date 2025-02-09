
import { AppRoute } from "@/types/routes";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Tenants from "@/pages/Tenants";
import WorkOrders from "@/pages/WorkOrders";
import Dashboard from "@/pages/Dashboard";
import Banking from "@/pages/Banking";
import Properties from "@/pages/Properties";

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
    path: "properties",
    element: (
      <ProtectedRoute allowedRoles={["property_manager"]}>
        <Properties />
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
    path: "banking",
    element: (
      <ProtectedRoute allowedRoles={["property_manager"]}>
        <Banking />
      </ProtectedRoute>
    ),
  }
];
