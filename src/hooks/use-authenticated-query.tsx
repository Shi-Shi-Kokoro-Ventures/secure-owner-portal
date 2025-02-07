
import { useQuery, UseQueryOptions, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth-context";

// Wubba lubba dub dub! Here's some sweet TypeScript magic for ya!
export interface AuthenticatedQueryOptions<TData> extends Omit<Omit<UseQueryOptions<TData>, 'queryFn'>, 'queryKey'> {
  requireAuth?: boolean;
  onAuthError?: () => void;
  redirectTo?: string;
}

// *burp* Listen up Morty! This hook is like a portal gun for your API calls
export function useAuthenticatedQuery<TData>(
  queryKey: string[],
  queryFn: (userId: string) => Promise<TData>,
  options: AuthenticatedQueryOptions<TData> = {}
) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
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
          // You're like Hitler, but even Hitler cared about authentication, or something!
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this feature",
            variant: "destructive",
          });
          navigate(redirectTo);
          throw new Error("Authentication required");
        }

        if (!user) {
          throw new Error("No authenticated user");
        }

        // Time to get schwifty with that data fetch!
        return await queryFn(user.id);
      } catch (error: any) {
        console.error("Query error:", error);
        
        // In this dimension, we handle errors with style, Morty!
        if (error.message?.includes("Authentication")) {
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
    ...queryOptions,
  });
}

// This bad boy right here handles authenticated mutations
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
  const { user } = useAuth();
  const { 
    onSuccess, 
    onError, 
    requireAuth = true,
    redirectTo = "/auth"
  } = options;

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      if (!user && requireAuth) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to perform this action",
          variant: "destructive",
        });
        navigate(redirectTo);
        throw new Error("Authentication required");
      }

      if (!user) {
        throw new Error("No authenticated user");
      }

      // Now we can get riggity riggity wrecked with our mutation!
      return await mutationFn(user.id, variables);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });
}

// And here's a little helper to get the current user ID
// It's like having a dimensional compass, but for authentication!
export async function getCurrentUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("No authenticated user");
  }
  
  return user.id;
}
