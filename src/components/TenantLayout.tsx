import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TenantSidebar } from "./TenantSidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const TenantLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <TenantSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <div className={cn(
          "flex flex-col flex-1 w-full",
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:pl-64" : "lg:pl-0"
        )}>
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TenantLayout;