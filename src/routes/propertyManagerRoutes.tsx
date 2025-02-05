import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Tenants from "@/pages/Tenants";
import WorkOrders from "@/pages/WorkOrders";

export const propertyManagerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute><Tenants /></ProtectedRoute>,
    path: "/tenants",
  },
  {
    element: <ProtectedRoute><WorkOrders /></ProtectedRoute>,
    path: "/work-orders",
  }
];