
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

// *burp* Listen up Morty, this is some serious type definition stuff here
// We're excluding some built-in query options because we're gonna handle that ourselves
// It's like removing the quantum coupling from a neutrino bomb, but way less explosive
export interface AuthenticatedQueryOptions<TData> extends Omit<Omit<UseQueryOptions<TData>, 'queryFn'>, 'queryKey'> {
  requireAuth?: boolean;
  onAuthError?: () => void;
}

// Wubba lubba dub dub! Here's a hook that makes sure you're not some
// dimensional hopping imposter trying to access our data
// It's like a portal gun for your API calls, but with actual security
export function useAuthenticatedQuery<TData>(
  queryKey: string[],
  queryFn: (userId: string) => Promise<TData>,
  options: AuthenticatedQueryOptions<TData> = {}
) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { requireAuth = true, onAuthError, ...queryOptions } = options;

  // Aw geez Rick, we're wrapping this whole thing in useQuery
  // It's gonna handle all our data fetching and caching
  // Like a microverse battery, but for data! *burp*
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
            navigate("/auth");
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
