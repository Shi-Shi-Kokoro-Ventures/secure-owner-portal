import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  ChartBar,
  MessageSquare,
  Settings,
} from "lucide-react";
import { logger } from "@/utils/logger";
import { useEffect } from "react";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Leases", href: "/admin/leases", icon: FileText },
  { name: "Payments", href: "/admin/financials", icon: DollarSign },
  { name: "Reports", href: "/admin/reports", icon: ChartBar },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminSidebar = ({ open, onOpenChange }: SidebarProps) => {
  const location = useLocation();

  useEffect(() => {
    logger.info("AdminSidebar mounted", { open, currentPath: location.pathname });
  }, [open, location.pathname]);

  return (
    <SidebarProvider defaultOpen={open}>
      <Sidebar className="border-r border-gray-200 dark:border-gray-800">
        <SidebarHeader className="h-16 flex items-center px-4">
          <img
            className="h-8 w-auto transition-transform hover:scale-105"
            src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png"
            alt="Shi Shi Kokoro"
            onError={(e) => {
              logger.error("Failed to load logo", { src: e.currentTarget.src });
              e.currentTarget.style.display = 'none';
            }}
          />
          <SidebarTrigger className="ml-auto lg:hidden" />
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className="w-full"
                    >
                      <Link
                        to={item.href}
                        className="flex items-center gap-3 px-3 py-2"
                        onClick={() => logger.info("Navigation clicked", { name: item.name, href: item.href })}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};