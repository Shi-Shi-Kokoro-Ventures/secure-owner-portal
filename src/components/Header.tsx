import { Bell, HelpCircle, MessageCircle, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const Header = () => {
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
    // This will be replaced with actual help documentation link
    window.open("/help", "_blank");
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png" 
            alt="Shi Shi Kokoro Property Management" 
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="flex-1 flex items-center">
          <Search className="h-5 w-5 text-gray-400 absolute ml-3" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 max-w-xs transition-all duration-200 focus:max-w-md"
          />
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:scale-110 transition-transform"
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
                  className="hover:scale-110 transition-transform"
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
                  className="hover:scale-110 transition-transform"
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

          <div className="flex items-center gap-2 ml-4 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
            <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
            <div className="text-sm">
              <div className="font-medium">Shi Shi Kokoro property...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};