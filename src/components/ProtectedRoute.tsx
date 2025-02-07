
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  redirectTo = "/auth" 
}: ProtectedRouteProps) => {
  // During development, bypass all checks
  if (import.meta.env.DEV) {
    return <>{children}</>;
  }

  const { user, isLoading } = useAuth();

  // Show loading state with a spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // In production, check for authentication
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Allow access if authenticated
  return <>{children}</>;
};
