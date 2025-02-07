
import { AppRoute } from "@/types/routes";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import VendorDashboard from "@/pages/vendor/VendorDashboard";
import VendorWorkOrders from "@/pages/vendor/VendorWorkOrders";
import VendorSchedule from "@/pages/vendor/VendorSchedule";
import VendorPayments from "@/pages/vendor/VendorPayments";
import VendorDocuments from "@/pages/vendor/VendorDocuments";
import VendorCommunications from "@/pages/vendor/VendorCommunications";
import VendorSettings from "@/pages/vendor/VendorSettings";

export const vendorRoutes: AppRoute[] = [
  {
    path: "dashboard",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "work-orders",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorWorkOrders />
      </ProtectedRoute>
    ),
  },
  {
    path: "schedule",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorSchedule />
      </ProtectedRoute>
    ),
  },
  {
    path: "payments",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorPayments />
      </ProtectedRoute>
    ),
  },
  {
    path: "documents",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorDocuments />
      </ProtectedRoute>
    ),
  },
  {
    path: "communications",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorCommunications />
      </ProtectedRoute>
    ),
  },
  {
    path: "settings",
    element: (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorSettings />
      </ProtectedRoute>
    ),
  }
];
