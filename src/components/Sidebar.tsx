
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Wrench,
  FileText,
  DollarSign,
  Settings,
  HelpCircle,
  Bell,
  Mail,
  FileArchive,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Owners", href: "/owners", icon: Users },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "Tenants", href: "/tenants", icon: Users },
  { name: "Work Orders", href: "/work-orders", icon: Wrench },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Banking", href: "/banking", icon: DollarSign },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Archives", href: "/archives", icon: FileArchive },
];

export const Sidebar = ({ open, onOpenChange }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50",
          "flex w-64 flex-col",
          "bg-white dark:bg-gray-900",
          "border-r border-gray-200 dark:border-gray-800",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-4">
          <img
            className="h-8 w-auto transition-transform hover:scale-105"
            src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png"
            alt="Shi Shi Kokoro"
          />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => onOpenChange(false)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    "transition-all duration-200",
                    isActive
                      ? "bg-gray-100 dark:bg-gray-800 text-primary"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-primary"
                        : "text-gray-400 group-hover:text-primary"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-800">
            <nav className="space-y-1 px-2 py-4">
              {secondaryNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      "transition-all duration-200",
                      isActive
                        ? "bg-gray-100 dark:bg-gray-800 text-primary"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive
                          ? "text-primary"
                          : "text-gray-400 group-hover:text-primary"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

