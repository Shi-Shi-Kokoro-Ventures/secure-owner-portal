
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  redirectTo = "/auth",
  requireAuth = true
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // Show loading state with a spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !user) {
    // Even in development, we should redirect if authentication is required
    return <Navigate to={redirectTo} replace />;
  }

  // Allow access if authenticated or if authentication is not required
  return <>{children}</>;
};
