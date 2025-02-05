import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Tenants from "@/pages/Tenants";

export const propertyManagerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute><Tenants /></ProtectedRoute>,
    path: "/tenants",
  }
];