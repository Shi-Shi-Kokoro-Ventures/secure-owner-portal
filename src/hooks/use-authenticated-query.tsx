
import { useQuery, UseQueryOptions, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth-context";
import { logger } from '@/utils/logger';

export interface AuthenticatedQueryOptions<TData> extends Omit<Omit<UseQueryOptions<TData>, 'queryFn'>, 'queryKey'> {
  requireAuth?: boolean;
  onAuthError?: () => void;
  redirectTo?: string;
}

export function useAuthenticatedQuery<TData>(
  queryKey: string[],
  queryFn: (userId: string) => Promise<TData>,
  options: AuthenticatedQueryOptions<TData> = {}
) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading: authLoading, refreshSession } = useAuth();
  const { 
    requireAuth = true, 
    onAuthError, 
    redirectTo = "/auth",
    ...queryOptions 
  } = options;

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        if (!user && requireAuth) {
          // Try to refresh the session before giving up
          await refreshSession();
          if (!user) {
            const error = new Error("Authentication required");
            error.name = "AuthenticationError";
            throw error;
          }
        }

        if (!user) {
          throw new Error("No authenticated user");
        }

        logger.info(`Executing authenticated query for user ${user.id}`, { queryKey });
        return await queryFn(user.id);
      } catch (error: any) {
        logger.error("Query error:", error);
        
        if (error.name === "AuthenticationError" || error.message?.includes("Authentication")) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this feature",
            variant: "destructive",
          });
          navigate(redirectTo);
          onAuthError?.();
        } else {
          toast({
            title: "Error",
            description: error.message || "An error occurred while fetching data",
            variant: "destructive",
          });
        }
        throw error;
      }
    },
    enabled: !authLoading && (!requireAuth || !!user),
    retry: (failureCount, error: any) => {
      // Don't retry on auth errors
      if (error.name === "AuthenticationError") return false;
      // Retry other errors up to 2 times
      return failureCount < 2;
    },
    ...queryOptions,
  });
}

export function useAuthenticatedMutation<TData, TVariables>(
  mutationFn: (userId: string, variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    requireAuth?: boolean;
    redirectTo?: string;
  } = {}
) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, refreshSession } = useAuth();
  const { 
    onSuccess, 
    onError, 
    requireAuth = true,
    redirectTo = "/auth"
  } = options;

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      try {
        if (!user && requireAuth) {
          // Try to refresh the session before giving up
          await refreshSession();
          if (!user) {
            const error = new Error("Authentication required");
            error.name = "AuthenticationError";
            throw error;
          }
        }

        if (!user) {
          throw new Error("No authenticated user");
        }

        logger.info(`Executing authenticated mutation for user ${user.id}`);
        return await mutationFn(user.id, variables);
      } catch (error: any) {
        logger.error("Mutation error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (error.name === "AuthenticationError") {
        toast({
          title: "Authentication Required",
          description: "Please sign in to perform this action",
          variant: "destructive",
        });
        navigate(redirectTo);
      } else {
        onError?.(error);
        toast({
          title: "Error",
          description: error.message || "An error occurred",
          variant: "destructive",
        });
      }
    },
  });
}

export async function getCurrentUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("No authenticated user");
  }
  
  return user.id;
}
