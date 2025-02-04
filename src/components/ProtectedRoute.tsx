import { Navigate } from "react-router-dom";

// Temporary mock auth - this should be replaced with real auth later
const isAuthenticated = () => {
  return localStorage.getItem("isPropertyManager") === "true";
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};