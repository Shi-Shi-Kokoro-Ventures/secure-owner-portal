
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
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Log current route state
  logger.info('ProtectedRoute:', {
    path: location.pathname,
    requireAuth,
    hasUser: !!user
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Development mode: Allow all access
  if (process.env.NODE_ENV === 'development') {
    logger.info('Development mode: bypassing auth checks');
    return <>{children}</>;
  }

  // Handle authentication check
  if (requireAuth && !user) {
    logger.info('Route requires authentication, redirecting to:', redirectTo);
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If all checks pass, render the route content
  return <>{children}</>;
};
