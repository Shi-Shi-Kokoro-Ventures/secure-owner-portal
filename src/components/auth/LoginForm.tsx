
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth-context";
import { logger } from "@/utils/logger";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { refreshSession } = useAuth();

  const from = (location.state as { from?: string })?.from || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    logger.info("Login attempt started for email:", email);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        logger.error("Supabase login error:", signInError);
        throw signInError;
      }

      logger.info("Supabase login successful, refreshing session");
      await refreshSession();

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        logger.error("Session retrieval error:", sessionError);
        throw sessionError;
      }

      if (!session?.user) {
        throw new Error("Session not established after login");
      }

      logger.info("Session established successfully:", {
        userId: session.user.id,
        userEmail: session.user.email
      });

      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('role, status')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        logger.error("Error fetching user profile:", profileError);
        throw new Error("Could not verify user profile");
      }

      if (profileData.status === 'pending_approval') {
        throw new Error("Your account is pending admin approval");
      }

      if (profileData.status !== 'active') {
        throw new Error("Account is not active");
      }

      logger.info("User profile retrieved:", profileData);
      toast({
        title: "Welcome back",
        description: "You have successfully logged in.",
      });
      
      logger.info("Redirecting to:", from);
      navigate(from, { replace: true });
    } catch (error: any) {
      logger.error("Login error caught:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>

      <p className="text-center text-gray-400 text-sm">
        New here?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-purple-400 hover:text-purple-300 font-medium"
          disabled={isLoading}
        >
          Register now
        </button>
      </p>
    </form>
  );
};

