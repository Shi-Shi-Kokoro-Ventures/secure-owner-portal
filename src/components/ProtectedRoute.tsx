
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
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Enhanced logging for debugging routing issues
  logger.info('ProtectedRoute state:', {
    path: location.pathname,
    requireAuth,
    hasUser: !!user,
    userRole: userProfile?.role,
    allowedRoles,
    isDevelopment: process.env.NODE_ENV === 'development'
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Development mode: Only check if user is authenticated
  if (process.env.NODE_ENV === 'development') {
    logger.info('Development mode: bypassing role checks');
    if (requireAuth && !user) {
      logger.info('Development mode: redirecting unauthenticated user');
      return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
    }
    logger.info('Development mode: allowing access');
    return <>{children}</>;
  }

  // Production mode: Full authentication and role checks
  if (requireAuth && !user) {
    logger.info('Route requires authentication, redirecting to:', redirectTo);
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Check role access in production
  if (allowedRoles.length > 0 && userProfile?.role && !allowedRoles.includes(userProfile.role)) {
    logger.warn('User role not authorized:', {
      userRole: userProfile.role,
      allowedRoles,
      path: location.pathname
    });
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    return <Navigate to="/dashboard" replace />;
  }

  // If all checks pass, render the route content
  return <>{children}</>;
};
