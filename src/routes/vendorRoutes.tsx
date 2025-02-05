
import { RouteObject } from "react-router-dom";
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
    element: <ProtectedRoute><VendorLayout /></ProtectedRoute>,
    children: [
      { path: "/vendor/dashboard", element: <VendorDashboard /> },
      { path: "/vendor/work-orders", element: <VendorWorkOrders /> },
      { path: "/vendor/schedule", element: <VendorSchedule /> },
      { path: "/vendor/payments", element: <VendorPayments /> },
      { path: "/vendor/documents", element: <VendorDocuments /> },
      { path: "/vendor/communications", element: <VendorCommunications /> },
      { path: "/vendor/settings", element: <VendorSettings /> }
    ]
  }
];
