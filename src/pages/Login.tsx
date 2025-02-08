
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
  const { user, userProfile, isLoading, error } = useAuth();

  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    if (isLoading) return;

    logger.info("Login component checking auth state:", { 
      userId: user?.id,
      userProfile,
      redirectPath: from
    });

    if (user?.id) {
      const defaultPath = userProfile?.role ? {
        admin: "/admin/dashboard",
        property_manager: "/property-manager/dashboard",
        tenant: "/tenant/dashboard",
        owner: "/owner/dashboard",
        vendor: "/vendor/dashboard"
      }[userProfile.role] : from;

      const redirectPath = defaultPath || from;

      logger.info("User authenticated, redirecting to:", {
        role: userProfile?.role,
        redirectPath
      });
      
      // Use replace: true to prevent back button from returning to login
      navigate(redirectPath, { replace: true });
    }
  }, [user, userProfile, navigate, from, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500">
        <div 
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"
          role="progressbar"
          aria-label="Loading"
        />
      </div>
    );
  }

  // Show error state if there's an authentication error
  if (error) {
    return (
      <AuthLayout>
        <AuthLogo />
        <div 
          className="text-center" 
          role="alert" 
          aria-live="polite"
        >
          <h2 className="text-3xl font-bold text-red-500 mb-2">Authentication Error</h2>
          <p className="text-gray-400 text-sm mb-4">
            {error.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Try Again
          </button>
        </div>
      </AuthLayout>
    );
  }

  // Show loading state while redirecting authenticated users
  if (user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500">
        <div 
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"
          role="progressbar"
          aria-label="Redirecting"
        />
      </div>
    );
  }

  // Show login form for unauthenticated users
  return (
    <AuthLayout>
      <AuthLogo />
      <div className="text-center">
        <h1 id="login-title" className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm">
          To sign in please enter your email and password
        </p>
      </div>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
