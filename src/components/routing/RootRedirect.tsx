
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

export const RootRedirect = () => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Save full attempted URL for post-login redirect
  const currentPath = `${location.pathname}${location.search}${location.hash}`;

  // Allow access to login page even when authenticated
  if (currentPath === '/login') {
    return null; // Don't redirect, let the Login component handle its own logic
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    logger.info('No user found, redirecting to login with return URL:', currentPath);
    return <Navigate to="/login" state={{ from: currentPath }} replace />;
  }

  if (!userProfile) {
    logger.error('User profile not found for authenticated user');
    toast({
      title: "Profile Error",
      description: "Unable to load user profile. Please try logging in again.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  // Handle special_admin access
  if (userProfile.role === 'special_admin') {
    // Allow special_admin to access any portal route directly
    if (currentPath.match(/^\/(admin|owner|tenant|vendor|property-manager)/)) {
      logger.info('Special admin accessing portal route:', currentPath);
      return null; // Allow access to the attempted path
    }
    // Default to admin dashboard if no specific route attempted
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
    logger.error('Invalid role detected:', userProfile.role);
    toast({
      title: "Invalid Role",
      description: "Your user account has an invalid role. Please contact support.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  logger.info('Redirecting user to default route:', defaultRoute);
  return <Navigate to={defaultRoute} replace />;
};

