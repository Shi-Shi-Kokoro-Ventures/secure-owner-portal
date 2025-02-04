import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  Wrench,
  CreditCard,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const TenantSidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
    { name: "Maintenance", href: "/tenant/maintenance", icon: Wrench },
    { name: "Payments", href: "/tenant/payments", icon: CreditCard },
    { name: "Documents", href: "/tenant/documents", icon: FileText },
    { name: "Communications", href: "/tenant/communications", icon: MessageSquare },
    { name: "Settings", href: "/tenant/settings", icon: Settings },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-primary px-2 pb-4">
        <div className="flex h-16 items-center px-4">
          <img 
            src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
            alt="Shi Shi Kokoro Property Management" 
            className="h-8 w-8 object-cover rounded-full"
          />
          <h1 className="text-white text-xl font-bold ml-2">Tenant Portal</h1>
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navigation.map((item) => (
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
        </nav>
      </div>
    </div>
  );
};