import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  DollarSign,
  Wrench,
  FileText,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Financials", href: "/admin/financials", icon: DollarSign },
  { name: "Maintenance", href: "/admin/maintenance", icon: Wrench },
  { name: "Leases", href: "/admin/leases", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
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
      </div>
    </>
  );
};