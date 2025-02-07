
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

// Wubba lubba dub dub! Here's some sweet TypeScript magic for ya!
// We're excluding some built-in query options because we handle them ourselves
export interface AuthenticatedQueryOptions<TData> extends Omit<Omit<UseQueryOptions<TData>, 'queryFn'>, 'queryKey'> {
  requireAuth?: boolean;
  onAuthError?: () => void;
  redirectTo?: string;
}

// *burp* Listen up Morty! This hook is like a portal gun for your API calls
// It makes sure you're not some dimensional hopping imposter trying to access our data
export function useAuthenticatedQuery<TData>(
  queryKey: string[],
  queryFn: (userId: string) => Promise<TData>,
  options: AuthenticatedQueryOptions<TData> = {}
) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { 
    requireAuth = true, 
    onAuthError, 
    redirectTo = "/auth",
    ...queryOptions 
  } = options;

  // Aw geez Rick, we're wrapping this whole thing in useQuery
  // It's gonna handle all our data fetching and caching
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        // Oh boy, here I go authenticating again!
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          // Great job breaking the authentication, JERRY!
          toast({
            title: "Authentication Error",
            description: "Please sign in to continue",
            variant: "destructive",
          });
          throw userError;
        }

        if (!user) {
          if (requireAuth) {
            // You're like Hitler, but even Hitler cared about authentication, or something!
            toast({
              title: "Authentication Required",
              description: "Please sign in to access this feature",
              variant: "destructive",
            });
            navigate(redirectTo);
            throw new Error("Authentication required");
          }
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
    ...queryOptions,
  });
}

// This bad boy right here handles authenticated mutations
// It's like a multiverse blender for your data modifications
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
  const { 
    onSuccess, 
    onError, 
    requireAuth = true,
    redirectTo = "/auth"
  } = options;

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      // Morty, w-w-we gotta check if the user exists first
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        if (requireAuth) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to perform this action",
            variant: "destructive",
          });
          navigate(redirectTo);
          throw new Error("Authentication required");
        }
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
