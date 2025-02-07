
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Home, FileText, MessageSquare, Settings, HelpCircle, Bell, WrenchIcon, CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TenantSidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TenantSidebar({ open, onOpenChange }: TenantSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/tenant/dashboard",
    },
    {
      label: "Maintenance",
      icon: WrenchIcon,
      href: "/tenant/maintenance",
    },
    {
      label: "Payments",
      icon: CreditCard,
      href: "/tenant/payments",
    },
    {
      label: "Documents",
      icon: FileText,
      href: "/tenant/documents",
    },
    {
      label: "Communications",
      icon: MessageSquare,
      href: "/tenant/communications",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/tenant/settings",
    },
    {
      label: "Help",
      icon: HelpCircle,
      href: "/tenant/help",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/tenant/notifications",
    },
  ];

  const onNavigate = (href: string) => {
    navigate(href);
    if (onOpenChange && isMobile) {
      onOpenChange(false);
    }
  };

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden"
            size="icon"
            aria-label="Open Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <ScrollArea className="h-full py-6">
            <div className="space-y-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">
                  Tenant Portal
                </h2>
                <div className="space-y-1">
                  {routes.map((route) => (
                    <Button
                      key={route.href}
                      variant={location.pathname === route.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => onNavigate(route.href)}
                    >
                      <route.icon className="mr-2 h-4 w-4" />
                      {route.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className={cn(
      "hidden lg:flex lg:flex-col",
      "h-screen w-64 border-r bg-background",
      "fixed left-0 top-0 z-40",
      open ? "translate-x-0" : "-translate-x-full",
      "transition-transform duration-300 ease-in-out"
    )}>
      <ScrollArea className="flex-1 py-6">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">
              Tenant Portal
            </h2>
            <div className="space-y-1">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={location.pathname === route.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => onNavigate(route.href)}
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
