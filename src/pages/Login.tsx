
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  const from = (location.state as { from?: string })?.from || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Welcome back",
        description: "You have successfully logged in.",
      });

      navigate(from, { replace: true });
    } catch (error: any) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500 p-4">
      <div className="w-full max-w-4xl h-[600px] bg-gradient-to-r from-purple-300/20 to-pink-300/20 backdrop-blur-xl rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Left side - 3D illustration */}
        <div className="relative hidden lg:block w-1/2">
          <img 
            src="/lovable-uploads/d793c034-9fa4-46a8-a72a-1f53f7440e0c.png"
            alt="Background decoration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent" />
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 p-8 bg-[#1A1F2C]/95 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 relative">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/40334d61-cc63-4970-bdb9-d08d169244d0.png" 
                    alt="Property Management Logo" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400 text-sm">
                To signin please enter your email and password
              </p>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
