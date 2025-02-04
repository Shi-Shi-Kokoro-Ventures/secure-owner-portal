import { Link } from "react-router-dom";
import { Home, Users, Building, Settings, HelpCircle } from "lucide-react";

export const Sidebar = () => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Owners", href: "/owners", icon: Users },
    { name: "Properties", href: "/properties", icon: Building },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-primary px-2 pb-4">
        <div className="flex h-16 items-center justify-center">
          <h1 className="text-white text-xl font-bold">Property Manager</h1>
        </div>
        <nav className="mt-5 flex-1 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-primary-700"
            >
              <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};