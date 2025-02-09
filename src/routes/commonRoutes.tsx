
import { Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Services from "@/pages/Services";
import TenantServices from "@/pages/TenantServices";
import AvailableProperties from "@/pages/AvailableProperties";
import Owners from "@/pages/Owners";
import Properties from "@/pages/Properties";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/use-auth-context";

const PropertiesRedirect = () => {
  const { userProfile } = useAuth();
  
  const roleRoutes: Record<string, string> = {
    admin: "/admin/properties",
    property_manager: "/property-manager/properties",
    owner: "/owner/properties",
    tenant: "/tenant/properties",
    special_admin: "/admin/properties"
  };

  const defaultRoute = roleRoutes[userProfile?.role || ""] || "/login";
  return <Navigate to={defaultRoute} replace />;
};

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
    path: "/properties",
    element: (
      <ProtectedRoute>
        <PropertiesRedirect />
      </ProtectedRoute>
    ),
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

