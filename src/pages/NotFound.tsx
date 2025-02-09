import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="text-center max-w-md">
        <img 
          src="/lovable-uploads/a6b28079-4ef6-41bf-af4d-e22739bc1007.png"
          alt="Shi Shi Kokoro Heart"
          className="w-32 h-32 mx-auto mb-6 animate-pulse"
        />
        <h1 className="text-4xl font-bold mb-4 text-primary">あら！(Ara!)</h1>
        <p className="text-xl text-gray-600 mb-2">ご不便をおかけして申し訳ございません。</p>
        <p className="text-lg text-gray-500 mb-6">
          We apologize for the inconvenience. It seems the page you're looking for has gone on a little journey! 
          Let's guide you back to a safe harbor.
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          ホームへ戻る (Return Home)
        </a>
      </div>
    </div>
  );
};

export default NotFound;