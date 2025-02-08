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

  // Only save full attempted URL for post-login redirect if it's not the root path
  const currentPath = location.pathname === "/" ? null : `${location.pathname}${location.search}${location.hash}`;

  // Allow access to login page even when authenticated
  if (location.pathname === '/login') {
    logger.info('Login page accessed, skipping redirect');
    return null; // Don't redirect, let the Login component handle its own logic
  }

  if (isLoading) {
    logger.info('Auth state loading, showing spinner');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    logger.info('No user found, redirecting to login with return URL:', currentPath);
    return <Navigate to="/login" state={{ from: currentPath }} replace />;
  }

  if (!userProfile) {
    logger.error('User profile not found for authenticated user:', user.id);
    toast({
      title: "Profile Error",
      description: "Unable to load user profile. Please try logging in again.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  // Handle special_admin access with enhanced logging
  if (userProfile.role === 'special_admin') {
    if (location.pathname.match(/^\/(admin|owner|tenant|vendor|property-manager)/)) {
      logger.info('Special admin accessing portal route:', location.pathname);
      return null; // Allow access to the attempted path
    }
    logger.info('Special admin redirecting to default dashboard');
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Map roles to their default dashboard routes
  const roleDashboards: Record<string, string> = {
    admin: "/admin/dashboard",
    property_manager: "/property-manager/dashboard",
    tenant: "/tenant/dashboard",
    owner: "/owner/dashboard",
    vendor: "/vendor/dashboard"
  };

  const defaultRoute = roleDashboards[userProfile.role];

  if (!defaultRoute) {
    logger.error('Invalid role detected:', {
      role: userProfile.role,
      userId: user.id,
      attemptedPath: location.pathname
    });
    toast({
      title: "Invalid Role",
      description: "Your user account has an invalid role. Please contact support.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  // Only redirect to default route if we're at the root path
  if (location.pathname === '/') {
    logger.info('Root path accessed, redirecting to default route:', defaultRoute);
    return <Navigate to={defaultRoute} replace />;
  }

  // Otherwise, let the ProtectedRoute component handle access control
  return null;
};
