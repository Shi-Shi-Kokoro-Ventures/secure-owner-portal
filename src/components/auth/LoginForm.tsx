
import { useState } from "react";
import { useLocation } from "react-router-dom";
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

      if (signInError) throw signInError;

      await refreshSession();
      logger.info("Login successful, session refreshed");
      
      // Let the Login component handle the redirect based on user role
    } catch (error: any) {
      logger.error("Login error:", error);
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.message?.toLowerCase().includes("invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.message?.toLowerCase().includes("network")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Reset loading state to allow retry
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mt-8 space-y-6"
      aria-labelledby="login-title"
      aria-live="polite"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" 
                   aria-hidden="true" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter Your Email"
              className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              aria-label="Email address"
              aria-required="true"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" 
                 aria-hidden="true" />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className="pl-10 bg-transparent border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              aria-label="Password"
              aria-required="true"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg transition-all duration-300"
        disabled={isLoading}
        aria-disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Signing in...</span>
          </>
        ) : (
          'Sign In'
        )}
      </Button>

      <p className="text-center text-gray-400 text-sm">
        New here?{" "}
        <a
          href="/signup"
          className="text-purple-400 hover:text-purple-300 font-medium"
        >
          Register now
        </a>
      </p>
    </form>
  );
};
