
import { Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Services from "@/pages/Services";
import TenantServices from "@/pages/TenantServices";
import AvailableProperties from "@/pages/AvailableProperties";
import Owners from "@/pages/Owners";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const commonRoutes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/tenant-services",
    element: <TenantServices />,
  },
  {
    path: "/available-properties",
    element: <AvailableProperties />,
  },
  {
    path: "/owners",
    element: (
      <ProtectedRoute allowedRoles={["admin", "property_manager"]}>
        <Owners />
      </ProtectedRoute>
    ),
  },
];
