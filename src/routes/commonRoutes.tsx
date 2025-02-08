
import { Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Services from "@/pages/Services";
import TenantServices from "@/pages/TenantServices";
import AvailableProperties from "@/pages/AvailableProperties";

export const commonRoutes = [
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
];
