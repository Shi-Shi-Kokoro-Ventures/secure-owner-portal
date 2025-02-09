
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logger";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/types/user";

export const ProtectedRoute = ({ 
  children,
  requiredRole 
}: { 
  children: React.ReactNode;
  requiredRole?: UserRole;
}) => {
  const { data: session, isLoading } = useQuery({
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // During development, bypass authentication checks
  if (import.meta.env.DEV) {
    logger.info('Development mode: bypassing auth checks');
    return <>{children}</>;
  }

  // In production, check for authentication
  if (!session) {
    logger.warn('No session found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Role check happens at the data layer through RLS policies
  return <>{children}</>;
};
