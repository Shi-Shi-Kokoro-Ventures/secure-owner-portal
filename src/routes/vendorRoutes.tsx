
import { Navigate, RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import VendorLayout from "@/components/VendorLayout";
import VendorDashboard from "@/pages/vendor/VendorDashboard";
import VendorWorkOrders from "@/pages/vendor/VendorWorkOrders";
import VendorSchedule from "@/pages/vendor/VendorSchedule";
import VendorPayments from "@/pages/vendor/VendorPayments";
import VendorDocuments from "@/pages/vendor/VendorDocuments";
import VendorCommunications from "@/pages/vendor/VendorCommunications";
import VendorSettings from "@/pages/vendor/VendorSettings";

export const vendorRoutes: RouteObject[] = [
  {
    path: "vendor",
    element: <ProtectedRoute requiredRole="vendor"><VendorLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: "dashboard",
        element: <VendorDashboard />
      },
      {
        path: "work-orders",
        element: <VendorWorkOrders />
      },
      {
        path: "schedule",
        element: <VendorSchedule />
      },
      {
        path: "payments",
        element: <VendorPayments />
      },
      {
        path: "documents",
        element: <VendorDocuments />
      },
      {
        path: "communications",
        element: <VendorCommunications />
      },
      {
        path: "settings",
        element: <VendorSettings />
      }
    ]
  }
];
