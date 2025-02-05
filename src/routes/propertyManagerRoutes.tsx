import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Owners from "@/pages/Owners";
import Properties from "@/pages/Properties";
import Tenants from "@/pages/Tenants";
import WorkOrders from "@/pages/WorkOrders";
import Reports from "@/pages/Reports";
import Banking from "@/pages/Banking";
import { AddPropertyForm } from "@/components/AddPropertyForm";
import { PlaceNewTenant } from "@/components/PlaceNewTenant";

export const propertyManagerRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: "/owners",
    element: <ProtectedRoute><Owners /></ProtectedRoute>
  },
  {
    path: "/properties",
    element: <ProtectedRoute><Properties /></ProtectedRoute>
  },
  {
    path: "/properties/add",
    element: <ProtectedRoute><AddPropertyForm /></ProtectedRoute>
  },
  {
    path: "/tenants",
    element: <ProtectedRoute><Tenants /></ProtectedRoute>
  },
  {
    path: "/tenant/place",
    element: <ProtectedRoute><PlaceNewTenant /></ProtectedRoute>
  },
  {
    path: "/work-orders",
    element: <ProtectedRoute><WorkOrders /></ProtectedRoute>
  },
  {
    path: "/reports",
    element: <ProtectedRoute><Reports /></ProtectedRoute>
  },
  {
    path: "/banking",
    element: <ProtectedRoute><Banking /></ProtectedRoute>
  }
];