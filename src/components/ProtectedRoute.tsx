
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

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
  
  // Save full path including search params and hash
  const currentPath = location.pathname + location.search + location.hash;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Handle authentication check
  if (requireAuth && !user) {
    logger.info('Protected route accessed without authentication:', currentPath);
    return <Navigate 
      to={redirectTo} 
      state={{ from: currentPath }} 
      replace 
    />;
  }

  // Role-based access control
  if (allowedRoles.length > 0) {
    if (!userProfile) {
      logger.error('No user profile found for role check');
      toast({
        title: "Profile Error",
        description: "Unable to load user profile. Please try logging in again.",
        variant: "destructive",
      });
      return <Navigate to={redirectTo} state={{ from: currentPath }} replace />;
    }

    // Special admins can access any route
    if (userProfile.role === 'special_admin') {
      logger.info('Special admin accessing protected route:', currentPath);
      return <>{children}</>;
    }

    // Check if user has required role
    if (!allowedRoles.includes(userProfile.role)) {
      logger.warn('Access denied - User role:', userProfile.role, 'Required roles:', allowedRoles);
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });

      // Map roles to their default dashboards
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

  logger.info('Access granted to protected route:', currentPath);
  return <>{children}</>;
};
