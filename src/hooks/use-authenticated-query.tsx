
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth-context";
import { logger } from '@/utils/logger';

export interface AuthenticatedQueryOptions<TData> extends Omit<UseQueryOptions<TData, Error>, 'queryKey' | 'queryFn'> {
  requireAuth?: boolean;
  redirectTo?: string;
  errorMessage?: string;
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
    redirectTo = "/auth",
    errorMessage = "An error occurred while fetching data",
    ...queryOptions 
  } = options;

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        if (!user && requireAuth) {
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
        } else {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
        throw error;
      }
    },
    enabled: !authLoading && (!requireAuth || !!user),
    retry: (failureCount, error: any) => {
      if (error.name === "AuthenticationError") return false;
      return failureCount < 2;
    },
    ...queryOptions,
  });
}

export interface AuthenticatedMutationOptions<TData, TVariables> extends Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'> {
  requireAuth?: boolean;
  redirectTo?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function useAuthenticatedMutation<TData, TVariables>(
  mutationFn: (userId: string, variables: TVariables) => Promise<TData>,
  options: AuthenticatedMutationOptions<TData, TVariables> = {}
) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, refreshSession } = useAuth();
  const { 
    requireAuth = true,
    redirectTo = "/auth",
    successMessage,
    errorMessage = "An error occurred",
    onSuccess,
    onError,
    ...mutationOptions
  } = options;

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      try {
        if (!user && requireAuth) {
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
    onSuccess: (data, variables, context) => {
      if (successMessage) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error: Error, variables, context) => {
      if (error.name === "AuthenticationError") {
        toast({
          title: "Authentication Required",
          description: "Please sign in to perform this action",
          variant: "destructive",
        });
        navigate(redirectTo);
      } else {
        if (onError) {
          onError(error, variables, context);
        }
        toast({
          title: "Error",
          description: errorMessage || error.message,
          variant: "destructive",
        });
      }
    },
    ...mutationOptions,
  });
}

export async function getCurrentUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("No authenticated user");
  }
  
  return user.id;
}
