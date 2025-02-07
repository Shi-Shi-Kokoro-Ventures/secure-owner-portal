
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface ProtectedPortalRouteProps {
  path: string;
  role: string;
  routes: Array<{
    path: string;
    element: React.ReactNode;
  }>;
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
                  key={route.path}
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
