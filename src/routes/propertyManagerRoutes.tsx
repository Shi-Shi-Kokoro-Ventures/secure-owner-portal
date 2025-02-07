
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Tenants from "@/pages/Tenants";
import WorkOrders from "@/pages/WorkOrders";
import Reports from "@/pages/Reports";

export const propertyManagerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute><Tenants /></ProtectedRoute>,
    path: "tenants",  // Removed leading slash
  },
  {
    element: <ProtectedRoute><WorkOrders /></ProtectedRoute>,
    path: "work-orders",  // Removed leading slash
  },
  {
    element: <ProtectedRoute><Reports /></ProtectedRoute>,
    path: "reports",  // Removed leading slash
  }
];
