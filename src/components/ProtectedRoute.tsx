
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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
  });

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // In production, check for authentication
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Allow access if authenticated
  return <>{children}</>;
};
