
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
  const { user, userProfile } = useAuth();

  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    logger.info("Login component mounted, checking auth state:", { 
      userId: user?.id,
      userProfile,
      redirectPath: from
    });

    if (user?.id && userProfile) {
      logger.info("User authenticated, redirecting to proper dashboard based on role:", {
        role: userProfile.role,
        redirectPath: from
      });

      // Only redirect if we have both user and profile
      const roleDashboards: Record<string, string> = {
        admin: "/admin/dashboard",
        property_manager: "/property-manager/dashboard",
        tenant: "/tenant/dashboard",
        owner: "/owner/dashboard",
        vendor: "/vendor/dashboard"
      };

      const redirectPath = userProfile.role ? roleDashboards[userProfile.role] || from : from;
      navigate(redirectPath, { replace: true });
    }
  }, [user, userProfile, navigate, from]);

  // If already authenticated, show loading state
  if (user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

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
