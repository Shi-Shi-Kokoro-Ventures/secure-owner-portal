
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
    role: userProfile?.role,
    isDevelopment: process.env.NODE_ENV === 'development'
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

  // Development mode: simplified routing
  if (process.env.NODE_ENV === 'development') {
    logger.info('Development mode: simplified routing');
    
    // If authenticated, default to admin dashboard for testing
    if (user) {
      logger.info('Development mode: redirecting to admin dashboard');
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    // If not authenticated, redirect to login
    logger.info('Development mode: redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Production mode: Role-based routing
  if (user && userProfile?.role) {
    const roleRoutes: Record<string, string> = {
      admin: "/admin/dashboard",
      property_manager: "/property-manager/dashboard",
      tenant: "/tenant/dashboard",
      owner: "/owner/dashboard",
      vendor: "/vendor/dashboard",
      special_admin: "/admin/dashboard"
    };

    const defaultRoute = roleRoutes[userProfile.role];
    if (defaultRoute) {
      logger.info('Redirecting to role-specific dashboard:', defaultRoute);
      return <Navigate to={defaultRoute} replace />;
    }
  }

  // Default fallback to login
  logger.info('No authenticated session or role, redirecting to login');
  return <Navigate to="/login" replace />;
};
