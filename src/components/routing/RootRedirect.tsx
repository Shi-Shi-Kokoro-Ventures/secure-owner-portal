
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

  // Map roles to their default routes - this is purely for navigation, not permissions
  const roleDefaultRoutes: Record<string, string> = {
    admin: "/admin/dashboard",
    property_manager: "/property-manager/dashboard",
    tenant: "/tenant/dashboard",
    owner: "/owner/dashboard",
    vendor: "/vendor/dashboard",
    special_admin: "/admin/dashboard"
  };

  // For root path, dashboard, or missing routes that should redirect to dashboard
  if (location.pathname === '/' || 
      location.pathname === '/dashboard' || 
      !location.pathname) {
    // If authenticated, navigate to role-specific dashboard
    if (user && userProfile?.role) {
      const defaultRoute = roleDefaultRoutes[userProfile.role];
      if (defaultRoute) {
        logger.info('Navigating to role-specific dashboard:', defaultRoute);
        return <Navigate to={defaultRoute} replace />;
      }
    }
    
    // If not authenticated or no role, redirect to login
    logger.info('No authenticated session, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // For login page, prevent authenticated users from accessing it
  if (location.pathname === '/login') {
    if (user && userProfile?.role) {
      const defaultRoute = roleDefaultRoutes[userProfile.role];
      if (defaultRoute) {
        logger.info('Authenticated user accessing login, redirecting to dashboard:', defaultRoute);
        return <Navigate to={defaultRoute} replace />;
      }
    }
    return null; // Allow access to login page for non-authenticated users
  }

  // Let the route components handle their own rendering logic
  return null;
};
