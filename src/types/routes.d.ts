
import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";

export interface CustomRoute {
  path: string;
  element: ReactNode;
  key?: string;
  title?: string;
}

export type AppRoute = CustomRoute | RouteObject;
