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
  AlertTriangle,
  UserPlus,
  DollarSign,
  Wrench,
  Award,
  BarChart3,
} from "lucide-react";
import { logger } from "@/utils/logger";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getNavigationItems = (role: string | undefined) => {
  const baseItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  ];

  const adminPmOwnerItems = [
    { name: "Active Leases", href: "/admin/leases", icon: FileText },
    { name: "Expiring Leases", href: "/admin/leases/expiring", icon: AlertTriangle },
    { name: "Lease Applications", href: "/admin/leases/applications", icon: UserPlus },
  ];

  const adminPmTenantItems = [
    { name: "Payments & Stripe", href: "/admin/financials", icon: DollarSign },
    { name: "Maintenance Requests", href: "/admin/maintenance", icon: Wrench },
    { name: "Tenant Rewards", href: "/admin/rewards", icon: Award },
  ];

  const adminPmOwnerReportsItem = [
    { name: "Reports & Compliance", href: "/admin/reports", icon: BarChart3 },
  ];

  if (!role) return baseItems;

  switch (role) {
    case 'admin':
      return [
        ...baseItems,
        ...adminPmOwnerItems,
        ...adminPmTenantItems,
        ...adminPmOwnerReportsItem,
      ];
    case 'property_manager':
      return [
        ...baseItems,
        ...adminPmOwnerItems,
        ...adminPmTenantItems,
        ...adminPmOwnerReportsItem,
      ];
    case 'owner':
      return [
        ...baseItems,
        ...adminPmOwnerItems,
        ...adminPmOwnerReportsItem,
      ];
    case 'tenant':
      return [
        ...baseItems,
        ...adminPmTenantItems,
      ];
    default:
      return baseItems;
  }
};

export const AdminSidebar = ({ open, onOpenChange }: SidebarProps) => {
  const location = useLocation();

  const { data: userRole } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      return data?.role;
    }
  });

  const navigation = getNavigationItems(userRole);

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