
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate 
      to={redirectTo} 
      state={{ from: location.pathname + location.search + location.hash }} 
      replace 
    />;
  }

  if (allowedRoles.length > 0) {
    if (!userProfile) {
      toast({
        title: "Profile Error",
        description: "Unable to load user profile. Please try logging in again.",
        variant: "destructive",
      });
      return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
    }

    // Special admins can access any route
    if (userProfile.role === 'special_admin') {
      return <>{children}</>;
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

  return <>{children}</>;
};
