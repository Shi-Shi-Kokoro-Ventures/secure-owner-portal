
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // During development, bypass all checks
  if (import.meta.env.DEV) {
    logger.info('Development mode: bypassing all auth checks');
    return <>{children}</>;
  }

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          logger.error('Auth error:', error);
          return null;
        }
        return session;
      } catch (error) {
        logger.error('Session error:', error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // In production, check for authentication
  if (!session) {
    logger.warn('No session found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Allow access if authenticated
  return <>{children}</>;
};
