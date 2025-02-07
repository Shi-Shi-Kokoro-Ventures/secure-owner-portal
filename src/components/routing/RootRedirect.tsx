
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth-context";
import { useToast } from "@/hooks/use-toast";

export const RootRedirect = () => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!userProfile) {
    toast({
      title: "Profile Error",
      description: "Unable to load user profile. Please try logging in again.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  if (userProfile.role === 'special_admin') {
    const path = location.pathname;
    if (path.startsWith('/admin') || 
        path.startsWith('/owner') || 
        path.startsWith('/tenant') || 
        path.startsWith('/vendor') || 
        path.startsWith('/property-manager')) {
      return null;
    }
    return <Navigate to="/admin/dashboard" replace />;
  }

  switch (userProfile.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'property_manager':
      return <Navigate to="/property-manager/dashboard" replace />;
    case 'tenant':
      return <Navigate to="/tenant/dashboard" replace />;
    case 'owner':
      return <Navigate to="/owner/dashboard" replace />;
    case 'vendor':
      return <Navigate to="/vendor/dashboard" replace />;
    default:
      toast({
        title: "Invalid Role",
        description: "Your user account has an invalid role. Please contact support.",
        variant: "destructive",
      });
      return <Navigate to="/login" replace />;
  }
};
