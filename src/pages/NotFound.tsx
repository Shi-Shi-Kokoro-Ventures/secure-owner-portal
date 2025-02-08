
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { logger } from "@/utils/logger";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    logger.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Check if the current path is /owners and redirect to /owner
    if (location.pathname === '/owners') {
      navigate('/owner', { replace: true });
      return;
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="text-center max-w-md">
        <img 
          src="/lovable-uploads/a6b28079-4ef6-41bf-af4d-e22739bc1007.png"
          alt="Shi Shi Kokoro Heart"
          className="w-32 h-32 mx-auto mb-6 animate-bounce"
        />
        <h1 className="text-4xl font-bold mb-4 text-primary">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
          >
            Go Back
          </Button>
          <Button 
            onClick={() => navigate("/admin/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
