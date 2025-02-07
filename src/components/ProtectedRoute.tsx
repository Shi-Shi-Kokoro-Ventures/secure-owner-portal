
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ 
  children, 
  redirectTo = "/login",
  requireAuth = true,
  allowedRoles = []
}: ProtectedRouteProps) => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

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
    // Save the attempted URL for redirect after login
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles.length > 0 && userProfile?.role) {
    if (!allowedRoles.includes(userProfile.role)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      return <Navigate to="/" replace />;
    }
  }

  // Allow access if all checks pass
  return <>{children}</>;
};
