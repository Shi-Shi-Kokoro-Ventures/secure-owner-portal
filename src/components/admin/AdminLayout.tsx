import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Header } from "@/components/Header";
import { VapiAssistant } from "./VapiAssistant";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { logger } from "@/utils/logger";
import { AnnouncementListener } from "./announcements/AnnouncementListener";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  useEffect(() => {
    logger.info("AdminLayout mounted", { sidebarOpen, aiChatOpen });
  }, [sidebarOpen, aiChatOpen]);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementListener />
      <div className="flex min-h-screen overflow-hidden">
        {/* Make sidebar fixed position and adjust z-index */}
        <div className="fixed inset-y-0 z-50">
          <AdminSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        </div>
        
        {/* Main content area with padding adjustments */}
        <div className={cn(
          "flex flex-col flex-1 w-full",
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:pl-64" : "lg:pl-0"
        )}>
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>

        {/* AI Assistant Button */}
        <div className="fixed bottom-4 right-4 z-50">
          {!aiChatOpen ? (
            <Button
              onClick={() => {
                logger.info("Opening AI chat");
                setAiChatOpen(true);
              }}
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          ) : (
            <div className="bg-background rounded-lg shadow-xl w-96 h-[600px] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">AI Assistant</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logger.info("Closing AI chat");
                    setAiChatOpen(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-hidden">
                <VapiAssistant />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};