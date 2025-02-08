
import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { logger } from "@/utils/logger";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { LoginForm } from "@/components/auth/LoginForm";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userProfile, isLoading } = useAuth();

  const from = (location.state as { from?: string })?.from || "/";

  const handleRedirect = useCallback(() => {
    if (!user?.id) return;

    const roleBasedPath = userProfile?.role ? {
      admin: "/admin/dashboard",
      property_manager: "/property-manager/dashboard",
      tenant: "/tenant/dashboard",
      owner: "/owner/dashboard",
      vendor: "/vendor/dashboard",
      special_admin: "/admin/dashboard"
    }[userProfile.role] : null;

    const redirectPath = roleBasedPath || from;

    logger.info("Redirecting authenticated user:", {
      role: userProfile?.role,
      redirectPath,
      from
    });
    
    navigate(redirectPath, { replace: true });
  }, [user, userProfile, navigate, from]);

  useEffect(() => {
    if (isLoading) return;
    handleRedirect();
  }, [isLoading, handleRedirect]);

  const LoadingSpinner = () => (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500 space-y-4"
      role="progressbar"
      aria-label="Loading"
    >
      <Loader2 className="h-8 w-8 animate-spin text-white" />
      <p className="text-white text-sm">Loading...</p>
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user?.id) {
    return (
      <AuthLayout>
        <AuthLogo />
        <div className="text-center">
          <h1 id="login-title" className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            To sign in please enter your email and password
          </p>
        </div>
        <LoginForm />
      </AuthLayout>
    );
  }

  return <LoadingSpinner />;
};

export default Login;
