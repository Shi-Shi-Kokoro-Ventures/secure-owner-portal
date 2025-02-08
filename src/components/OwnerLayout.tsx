
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { OwnerSidebar } from "./OwnerSidebar";
import { Header } from "./Header";
import { useAuth } from "@/hooks/use-auth-context";
import { Loader2 } from "lucide-react";

export const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerSidebar />
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;

