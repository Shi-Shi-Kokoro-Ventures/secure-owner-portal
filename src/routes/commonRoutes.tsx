import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Services from "@/pages/Services";

export const commonRoutes: RouteObject[] = [
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
    path: "*",
    element: <NotFound />,
  },
];