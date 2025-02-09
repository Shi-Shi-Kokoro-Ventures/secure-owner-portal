
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

  // Log current route state
  logger.info('ProtectedRoute:', {
    path: location.pathname,
    requireAuth,
    allowedRoles,
    hasUser: !!user,
    userRole: userProfile?.role
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Handle authentication check
  if (requireAuth && !user) {
    logger.info('Route requires authentication, redirecting to:', redirectTo);
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Handle role-based navigation
  if (allowedRoles.length > 0 && userProfile?.role) {
    // Special admin can access all routes
    if (userProfile.role === 'special_admin') {
      logger.info('Special admin accessing route');
      return <>{children}</>;
    }

    // Check if user's role is allowed for this route
    if (!allowedRoles.includes(userProfile.role)) {
      logger.warn('User role not allowed for this route');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });

      // Navigate to role-specific dashboard
      const roleDashboards: Record<string, string> = {
        admin: "/admin/dashboard",
        property_manager: "/property-manager/dashboard",
        tenant: "/tenant/dashboard",
        owner: "/owner/dashboard",
        vendor: "/vendor/dashboard"
      };

      const fallbackRoute = roleDashboards[userProfile.role] || "/";
      return <Navigate to={fallbackRoute} replace />;
    }
  }

  // If all checks pass, render the route content
  return <>{children}</>;
};
