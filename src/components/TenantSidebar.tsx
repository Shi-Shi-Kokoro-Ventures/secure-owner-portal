import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Home,
  Wrench,
  FileText,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Bell,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface TenantSidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const TenantSidebar = ({ open, onOpenChange }: TenantSidebarProps) => {
  const isMobile = useIsMobile();

  const links = [
    { to: "/tenant/dashboard", icon: Home, label: "Dashboard" },
    { to: "/tenant/maintenance", icon: Wrench, label: "Maintenance" },
    { to: "/tenant/payments", icon: CreditCard, label: "Payments" },
    { to: "/tenant/documents", icon: FileText, label: "Documents" },
    { to: "/tenant/communications", icon: MessageSquare, label: "Messages" },
    { to: "/tenant/settings", icon: Settings, label: "Settings" },
    { to: "/tenant/help", icon: HelpCircle, label: "Help" },
    { to: "/tenant/notifications", icon: Bell, label: "Notifications" },
  ];

  const sidebarContent = (
    <>
      <SheetHeader className="px-6 py-4">
        <SheetTitle>Tenant Portal</SheetTitle>
      </SheetHeader>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </ScrollArea>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-64 p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-50 flex w-64 flex-col bg-background transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {sidebarContent}
    </div>
  );
};