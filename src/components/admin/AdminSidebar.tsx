import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  ChevronLeft,
  ClipboardList,
  Home,
  Settings,
  Users,
  Wallet,
  Wrench,
  BarChart2,
  Megaphone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AnnouncementDialog } from "@/components/admin/announcements/AnnouncementDialog";

interface AdminSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AdminSidebar = ({ open, onOpenChange }: AdminSidebarProps) => {
  const location = useLocation();

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: Home,
    },
    {
      name: "Lease Management",
      path: "/admin/leases",
      icon: ClipboardList,
    },
    {
      name: "Property Management",
      path: "/admin/properties",
      icon: Building2,
    },
    {
      name: "Payments",
      path: "/admin/payments",
      icon: Wallet,
    },
    {
      name: "Maintenance",
      path: "/admin/maintenance",
      icon: Wrench,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: BarChart2,
    },
    {
      name: "Newsletters",
      path: "/admin/newsletters",
      icon: Mail,
    },
    {
      name: "User Management",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-background/80 backdrop-blur-sm transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-[60px]"
      )}
    >
      <div className="flex h-14 items-center border-b px-3">
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto hover:bg-transparent"
          onClick={() => onOpenChange(!open)}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-all",
              !open && "rotate-180"
            )}
          />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isCurrentPath(item.path) && "bg-accent text-accent-foreground",
                !open && "justify-center"
              )}
            >
              <item.icon className="h-4 w-4" />
              {open && <span>{item.name}</span>}
            </Link>
          ))}
          <AnnouncementDialog 
            trigger={
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  !open && "justify-center"
                )}
              >
                <Megaphone className="h-4 w-4" />
                {open && <span>Broadcast</span>}
              </button>
            }
          />
        </div>
      </ScrollArea>

      <Separator />
      
      <div className="p-4">
        {open && (
          <p className="text-xs text-muted-foreground">
            Admin Portal v1.0
          </p>
        )}
      </div>
    </div>
  );
};