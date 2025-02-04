import { Bell, HelpCircle, MessageCircle, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Header = () => {
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1 flex items-center">
          <Search className="h-5 w-5 text-gray-400 absolute ml-3" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 max-w-xs"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
            <div className="text-sm">
              <div className="font-medium">Shi Shi Kokoro property...</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#4C8DAE] text-white px-4 py-2 text-sm">
        <div className="flex items-center justify-between">
          <div>Setup Progress</div>
          <div className="flex items-center gap-4">
            <div>0%</div>
            <Button variant="secondary" size="sm" className="h-7">
              Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};