import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Building, 
  Settings, 
  HelpCircle,
  Mail,
  FileSignature,
  Archive,
  Wallet,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const location = useLocation();
  
  const navigationGroups = [
    {
      items: [
        { name: "Summary", href: "/", icon: Home }
      ]
    },
    {
      label: "Properties",
      items: [
        { name: "Properties List", href: "/properties", icon: Building }
      ]
    },
    {
      label: "Tenants",
      items: [
        { name: "Tenant List", href: "/tenants", icon: Users },
        { name: "Mailing Wizard", href: "/mailing", icon: Mail },
        { name: "Signature Requests", href: "/tenant-signatures", icon: FileSignature },
        { name: "Tenant Archives", href: "/tenant-archives", icon: Archive }
      ]
    },
    {
      label: "Banking",
      items: [
        { name: "Banking", href: "/banking", icon: Wallet }
      ]
    },
    {
      label: "Owners",
      items: [
        { name: "Owner List", href: "/owners", icon: Users },
        { name: "Signature Requests", href: "/owner-signatures", icon: FileSignature },
        { name: "Owner Archives", href: "/owner-archives", icon: Archive }
      ]
    },
    {
      label: "Other",
      items: [
        { name: "Reports", href: "/reports", icon: FileText },
        { name: "Settings", href: "/settings", icon: Settings },
        { name: "Help", href: "/help", icon: HelpCircle }
      ]
    }
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-primary px-2 pb-4">
        <div className="flex h-16 items-center px-4">
          <img src="/lovable-uploads/1ab03cf0-3373-4f12-80ac-d96a64aeb0de.png" alt="Logo" className="h-8 w-8" />
          <h1 className="text-white text-xl font-bold ml-2">Property Manager</h1>
        </div>
        <nav className="mt-5 flex-1 space-y-8 px-2">
          {navigationGroups.map((group, index) => (
            <div key={index}>
              {group.label && (
                <h3 className="px-3 text-sm font-semibold text-gray-200 mb-2">
                  {group.label}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-primary-700",
                      location.pathname === item.href && "bg-primary-700"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};