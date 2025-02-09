
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

  // Log current route and auth state for debugging
  logger.info('ProtectedRoute:', {
    path: location.pathname,
    requireAuth,
    allowedRoles,
    hasUser: !!user,
    userRole: userProfile?.role
  });
  
  // Save full path including search params and hash
  const currentPath = `${location.pathname}${location.search}${location.hash}`;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Step 1: Authentication Check (independent of role)
  if (requireAuth && !user) {
    logger.info('Protected route accessed without authentication, redirecting to:', redirectTo);
    return <Navigate to={redirectTo} state={{ from: currentPath }} replace />;
  }

  // Step 2: Role-based Access Control (separate from authentication)
  if (allowedRoles.length > 0 && userProfile) {
    // Super admin bypass
    if (userProfile.role === 'special_admin') {
      logger.info('Special admin accessing protected route');
      return <>{children}</>;
    }

    // Role check
    if (!allowedRoles.includes(userProfile.role)) {
      logger.warn('Access denied - User role does not match required roles');
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

      // Redirect to role-specific dashboard or fallback
      const redirectPath = userProfile.role ? roleDashboards[userProfile.role] || "/" : "/";
      return <Navigate to={redirectPath} replace />;
    }
  }

  // If all checks pass, render the protected content
  logger.info('Access granted to protected route');
  return <>{children}</>;
};
