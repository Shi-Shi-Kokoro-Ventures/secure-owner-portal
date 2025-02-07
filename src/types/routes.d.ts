
import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";

export interface CustomRoute {
  path: string;
  element: ReactNode;
  key?: string;
  title?: string;
}

export interface AdminRoute extends CustomRoute {
  requiresAuth?: boolean;
}

export type AppRoute = CustomRoute | RouteObject;
