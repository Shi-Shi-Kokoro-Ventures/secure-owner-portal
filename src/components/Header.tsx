import { Bell, HelpCircle, Menu, MessageCircle, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleMessages = () => {
    navigate("/tenant/communications");
    toast({
      title: "Messages",
      description: "Navigating to communications page",
    });
  };

  const handleNotifications = () => {
    navigate("/notifications");
    toast({
      title: "Notifications",
      description: "Navigating to notifications page",
    });
  };

  const handleHelp = () => {
    toast({
      title: "Help Center",
      description: "Opening help documentation",
    });
    window.open("/help", "_blank");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png"
              alt="Shi Shi Kokoro"
              className="h-8 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold leading-none">
                Shi Shi Kokoro
              </span>
              <span className="text-sm text-muted-foreground">
                Property Management
              </span>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-4 justify-end">
            <form className="flex-1 hidden md:block max-w-xs">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 bg-background"
                />
              </div>
            </form>
          
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={handleMessages}
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Messages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={handleNotifications}
                    >
                      <Bell className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={handleHelp}
                    >
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Help</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex items-center gap-3 ml-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors cursor-pointer">
                <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
                <div className="hidden md:block">
                  <div className="font-medium leading-none">Shi Shi Kokoro</div>
                  <div className="text-xs text-muted-foreground mt-1">Property Management</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};