
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  Wrench,
  CreditCard,
  FileText,
  MessageSquare,
  Settings,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const VendorSidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { name: "Work Orders", href: "/vendor/work-orders", icon: Wrench },
    { name: "Schedule", href: "/vendor/schedule", icon: Calendar },
    { name: "Payments", href: "/vendor/payments", icon: CreditCard },
    { name: "Documents", href: "/vendor/documents", icon: FileText },
    { name: "Communications", href: "/vendor/communications", icon: MessageSquare },
    { name: "Settings", href: "/vendor/settings", icon: Settings },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-primary px-2 pb-4">
        <div className="flex h-16 items-center px-4">
          <img 
            src="/lovable-uploads/40096a48-9069-46bc-9f6f-b4957de0ef74.png" 
            alt="Shi Shi Kokoro Property Management" 
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-white text-xl font-bold ml-2">Vendor Portal</h1>
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
