import { Bell, HelpCircle, MessageCircle, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tooltip } from "./ui/tooltip";

export const Header = () => {
  return (
    <div className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1 flex items-center">
          <Search className="h-5 w-5 text-gray-400 absolute ml-3" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 max-w-xs transition-all duration-200 focus:max-w-md"
          />
        </div>
        <div className="flex items-center gap-4">
          <Tooltip content="Messages">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Notifications">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <Bell className="h-5 w-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Help">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </Tooltip>
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