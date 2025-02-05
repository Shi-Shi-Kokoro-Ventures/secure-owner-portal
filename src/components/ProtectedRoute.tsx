import { Navigate } from "react-router-dom";

// During development, we'll skip auth checks
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};