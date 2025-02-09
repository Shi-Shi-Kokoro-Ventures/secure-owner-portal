import { RouteObject } from "react-router-dom";

export interface AdminRoute extends RouteObject {
  key: string;
  path: string;
  element: React.ReactNode;
  requiresAuth?: boolean;
  title?: string;
}