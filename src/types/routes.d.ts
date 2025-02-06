import { RouteObject } from "react-router-dom";

export interface AdminRoute extends RouteObject {
  key: string;
  requiresAuth?: boolean;
  title?: string;
}