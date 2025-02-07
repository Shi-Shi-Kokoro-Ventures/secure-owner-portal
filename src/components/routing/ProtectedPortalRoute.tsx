
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppRoute } from "@/types/routes";

interface ProtectedPortalRouteProps {
  path: string;
  role: string;
  routes: AppRoute[];
}

export const ProtectedPortalRoute = ({ path, role, routes }: ProtectedPortalRouteProps) => {
  return (
    <Route
      path={`${path}/*`}
      element={
        <ProtectedRoute allowedRoles={[role]}>
          <Layout>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path || `route-${Math.random()}`}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Layout>
        </ProtectedRoute>
      }
    />
  );
};
