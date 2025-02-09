import { Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Services from "@/pages/Services";
import TenantServices from "@/pages/TenantServices";

export const commonRoutes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/tenant-services",
    element: <TenantServices />,
  },
];