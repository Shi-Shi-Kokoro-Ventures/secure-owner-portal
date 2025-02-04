import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  Building2,
  FileText,
  FileSpreadsheet,
  FileBarChart,
  MessageSquare,
  Settings,
  Wrench,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const OwnerSidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/owner/properties", icon: Building2 },
    { name: "Statements", href: "/owner/statements", icon: FileSpreadsheet },
    { name: "Documents", href: "/owner/documents", icon: FileText },
    { name: "Reports", href: "/owner/reports", icon: FileBarChart },
    { name: "Communications", href: "/owner/communications", icon: MessageSquare },
    { name: "Maintenance", href: "/owner/maintenance", icon: Wrench },
    { name: "Payments", href: "/owner/payments", icon: CreditCard },
    { name: "Settings", href: "/owner/settings", icon: Settings },
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
          <h1 className="text-white text-xl font-bold ml-2">Owner Portal</h1>
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