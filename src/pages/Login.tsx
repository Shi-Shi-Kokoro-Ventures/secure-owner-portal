
import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { logger } from "@/utils/logger";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userProfile, isLoading } = useAuth();

  const from = (location.state as { from?: string })?.from || "/";

  const handleRedirect = useCallback(() => {
    if (!user?.id) return;

    const defaultPath = userProfile?.role ? {
      admin: "/admin/dashboard",
      property_manager: "/property-manager/dashboard",
      tenant: "/tenant/dashboard",
      owner: "/owner/dashboard",
      vendor: "/vendor/dashboard"
    }[userProfile.role] : from;

    const redirectPath = defaultPath || from;

    logger.info("Redirecting authenticated user:", {
      role: userProfile?.role,
      redirectPath
    });
    
    // Use replace: true to prevent back button from returning to login
    navigate(redirectPath, { replace: true });
  }, [user, userProfile, navigate, from]);

  useEffect(() => {
    if (isLoading) return;
    handleRedirect();
  }, [isLoading, handleRedirect]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500"
        role="progressbar"
        aria-label="Loading authentication status"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    );
  }

  // Show login form for unauthenticated users
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

  // Show loading state while redirecting authenticated users
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500"
      role="progressbar"
      aria-label="Redirecting"
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
    </div>
  );
};

export default Login;
