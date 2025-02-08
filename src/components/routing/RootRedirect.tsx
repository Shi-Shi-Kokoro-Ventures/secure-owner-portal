
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

export const RootRedirect = () => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Enhanced logging of the current state
  logger.info('RootRedirect state:', {
    hasUser: !!user,
    hasProfile: !!userProfile,
    isLoading,
    currentPath: location.pathname,
    role: userProfile?.role
  });

  // Handle loading state
  if (isLoading) {
    logger.info('Auth state loading, showing spinner');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Map roles to their default dashboard routes
  const roleDashboards: Record<string, string> = {
    admin: "/admin/dashboard",
    property_manager: "/property-manager/dashboard",
    tenant: "/tenant/dashboard",
    owner: "/owner/dashboard",
    vendor: "/vendor/dashboard",
    special_admin: "/admin/dashboard"
  };

  // For root path, redirect to appropriate dashboard
  if (location.pathname === '/') {
    if (user && userProfile) {
      const defaultRoute = roleDashboards[userProfile.role];
      if (defaultRoute) {
        logger.info('Redirecting to default dashboard:', defaultRoute);
        return <Navigate to={defaultRoute} replace />;
      }
    }
    // If no user or no valid role, redirect to login
    logger.info('No valid user/role, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // For login page
  if (location.pathname === '/login') {
    if (user && userProfile) {
      const defaultRoute = roleDashboards[userProfile.role];
      if (defaultRoute) {
        logger.info('Logged in user accessing login, redirecting to:', defaultRoute);
        return <Navigate to={defaultRoute} replace />;
      }
    }
    return null; // Allow access to login page
  }

  // For all other routes
  if (!user || !userProfile) {
    logger.info('Protected route accessed without auth, redirecting to login');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Let route components handle specific access control
  return null;
};
