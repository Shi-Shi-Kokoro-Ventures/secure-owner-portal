
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { logger } from "@/utils/logger";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    logger.info("Login component mounted, checking auth state:", { 
      userId: user?.id,
      redirectPath: from
    });

    if (user?.id) {
      logger.info("User already authenticated, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <AuthLayout>
      <AuthLogo />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-sm">
          To sign in please enter your email and password
        </p>
      </div>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
