
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  redirectTo = "/auth" 
}: ProtectedRouteProps) => {
  // During development, bypass all checks
  if (import.meta.env.DEV) {
    return <>{children}</>;
  }

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        logger.error('Auth error:', error);
        return null;
      }
      return session;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1,
  });

  // Show loading state with a spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Log any authentication errors
  if (error) {
    logger.error('Protected route error:', error);
    return <Navigate to={redirectTo} replace />;
  }

  // In production, check for authentication
  if (!session) {
    return <Navigate to={redirectTo} replace />;
  }

  // Allow access if authenticated
  return <>{children}</>;
};
