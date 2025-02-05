import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Applications from "@/pages/Applications";
import Notifications from "@/pages/Notifications";
import Help from "@/pages/Help";
import Messages from "@/pages/Messages";
import Archives from "@/pages/Archives";
import Settings from "@/pages/Settings";

export const commonRoutes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/", element: <Login /> },
  {
    path: "/notifications",
    element: <ProtectedRoute><Notifications /></ProtectedRoute>
  },
  {
    path: "/help",
    element: <ProtectedRoute><Help /></ProtectedRoute>
  },
  {
    path: "/messages",
    element: <ProtectedRoute><Messages /></ProtectedRoute>
  },
  {
    path: "/archives",
    element: <ProtectedRoute><Archives /></ProtectedRoute>
  },
  {
    path: "/settings",
    element: <ProtectedRoute><Settings /></ProtectedRoute>
  },
  {
    path: "/applications",
    element: <ProtectedRoute><Applications /></ProtectedRoute>
  },
  { path: "*", element: <NotFound /> }
];