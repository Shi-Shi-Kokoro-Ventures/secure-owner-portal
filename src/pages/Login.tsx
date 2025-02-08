
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth-context";
import { logger } from "@/utils/logger";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, userProfile } = useAuth();

  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    logger.info("Login component mounted, checking auth state:", { 
      userId: user?.id,
      userEmail: user?.email,
      userRole: userProfile?.role,
      redirectPath: from
    });

    if (user?.id && userProfile) {
      if (userProfile.status === 'active') {
        logger.info("User authenticated and active", {
          path: from,
          userRole: userProfile.role
        });
        navigate(from, { replace: true });
      } else if (userProfile.status === 'pending_approval') {
        toast({
          title: "Account pending approval",
          description: "Your account is awaiting admin approval. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account not active",
          description: "Your account is not active. Please contact support.",
          variant: "destructive",
        });
      }
    }
  }, [user, userProfile, navigate, from]);

  return (
    <AuthLayout>
      <AuthLogo />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-sm">
          To signin please enter your email and password
        </p>
      </div>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;

