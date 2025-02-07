
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

  // Check authentication and preserve the attempted URL
  if (requireAuth && !user) {
    // Save the full attempted URL path for redirect after login
    return <Navigate 
      to={redirectTo} 
      state={{ from: location.pathname + location.search + location.hash }} 
      replace 
    />;
  }

  // Check role-based access if roles are specified and user profile exists
  if (allowedRoles.length > 0) {
    // Ensure user profile exists before checking role
    if (!userProfile) {
      toast({
        title: "Profile Error",
        description: "Unable to load user profile. Please try logging in again.",
        variant: "destructive",
      });
      return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
    }

    // Check if user has required role
    if (!allowedRoles.includes(userProfile.role)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      // Redirect to appropriate dashboard based on user's role
      const roleDashboards: Record<string, string> = {
        admin: "/admin/dashboard",
        property_manager: "/property-manager/dashboard",
        tenant: "/tenant/dashboard",
        owner: "/owner/dashboard",
        vendor: "/vendor/dashboard"
      };
      const redirectPath = userProfile.role ? roleDashboards[userProfile.role] || "/" : "/";
      return <Navigate to={redirectPath} replace />;
    }
  }

  // Allow access if all checks pass
  return <>{children}</>;
};
