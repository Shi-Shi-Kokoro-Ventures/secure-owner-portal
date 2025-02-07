
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export interface AuthenticatedQueryOptions<TData> extends Omit<Omit<UseQueryOptions<TData>, 'queryFn'>, 'queryKey'> {
  requireAuth?: boolean;
  onAuthError?: () => void;
}

export function useAuthenticatedQuery<TData>(
  queryKey: string[],
  queryFn: (userId: string) => Promise<TData>,
  options: AuthenticatedQueryOptions<TData> = {}
) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { requireAuth = true, onAuthError, ...queryOptions } = options;

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          toast({
            title: "Authentication Error",
            description: "Please sign in to continue",
            variant: "destructive",
          });
          throw userError;
        }

        if (!user) {
          if (requireAuth) {
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

        return await queryFn(user.id);
      } catch (error: any) {
        console.error("Query error:", error);
        
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
