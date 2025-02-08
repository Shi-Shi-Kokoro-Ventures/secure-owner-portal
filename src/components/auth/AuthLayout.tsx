
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
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

        {/* Right side - Content */}
        <div className="w-full lg:w-1/2 p-8 bg-[#1A1F2C]/95 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

