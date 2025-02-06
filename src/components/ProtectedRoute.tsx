import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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

  const { data: userRole } = useQuery({
    queryKey: ['userRole', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          logger.error('Error fetching user role:', error);
          return null;
        }

        return data?.role;
      } catch (error) {
        logger.error('Role fetch error:', error);
        return null;
      }
    },
    enabled: !!session?.user?.id,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // During development, we'll allow access
  if (import.meta.env.DEV) {
    logger.info('Development mode: bypassing auth check');
    return <>{children}</>;
  }

  // In production, enforce authentication and role check
  if (!session) {
    logger.warn('No session found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!userRole) {
    logger.warn('No user role found, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  // Check if user has admin role
  if (userRole !== 'admin') {
    logger.warn('User is not an admin, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};