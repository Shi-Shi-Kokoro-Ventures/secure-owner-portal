import { useState } from "react";
import { Sidebar } from "./AdminSidebar";
import { Header } from "@/components/Header";
import { VapiAssistant } from "./VapiAssistant";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        sidebarOpen ? "lg:pl-64" : "lg:pl-0"
      )}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="py-8 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {!aiChatOpen ? (
          <Button
            onClick={() => setAiChatOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <div className="bg-white rounded-lg shadow-xl w-96 h-[600px] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">AI Assistant</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAiChatOpen(false)}
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
  );
};