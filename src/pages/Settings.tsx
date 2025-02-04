import { Layout } from "@/components/Layout";
import {
  Globe,
  Mail,
  UserCog,
  Users,
  Share2,
  Settings as SettingsIcon,
  Bell,
  ClipboardList,
  MessageSquare,
  FileText,
  User,
  CreditCard,
  Lock,
  DollarSign,
  RefreshCcw,
  Building,
  ChevronDown,
  Wrench,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Settings = () => {
  const [expandedSections, setExpandedSections] = useState({
    account: true,
    financial: true,
    program: true,
    tools: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'account',
      title: "Account",
      items: [
        {
          icon: User,
          title: "Your Account & Subscription",
          description: "Rentec Direct subscription and payment details.",
          href: "#account-subscription"
        },
        {
          icon: CreditCard,
          title: "Your Contact Information",
          description: "Personal or corporate contact information.",
          href: "#contact-info"
        },
        {
          icon: Lock,
          title: "Login & Password",
          description: "Change your login or password to the application.",
          href: "#login-password",
          showLiveHelp: true
        },
        {
          icon: Users,
          title: "Managers & Users",
          description: "Add and edit managers and other employees.",
          href: "#managers-users"
        },
        {
          icon: Share2,
          title: "Refer a Friend",
          description: "Earn credit by sharing with a colleague or friend.",
          href: "#refer-friend"
        }
      ]
    },
    {
      id: 'financial',
      title: "Financial",
      items: [
        {
          icon: FileText,
          title: "Accounting Defaults",
          description: "Defaults related to accounting display options.",
          href: "#accounting-defaults"
        },
        {
          icon: CreditCard,
          title: "Online Payments",
          description: "Set up ACH and credit payment capabilities.",
          href: "#online-payments"
        },
        {
          icon: DollarSign,
          title: "Cash Payments",
          description: "Set up Cash Payments.",
          href: "#cash-payments"
        },
        {
          icon: RefreshCcw,
          title: "Recurring Transactions",
          description: "Manage existing recurring transactions (rent, etc).",
          href: "#recurring-transactions"
        },
        {
          icon: DollarSign,
          title: "Chart of Accounts",
          description: "Manage your income & expense categories, along with asset and liability accounts.",
          href: "#chart-accounts"
        },
        {
          icon: Building,
          title: "Products & Services",
          description: "Define your products and services.",
          href: "#products-services"
        },
        {
          icon: Wrench,
          title: "CAM Pools",
          description: "Set up and configure shared CAM pools.",
          href: "#cam-pools"
        },
        {
          icon: Users,
          title: "Vendors & Payees",
          description: "Set up and manage an address book of payees.",
          href: "#vendors-payees"
        }
      ]
    },
    {
      id: 'program',
      title: "Program",
      items: [
        {
          icon: SettingsIcon,
          title: "Program Defaults",
          description: "General program defaults and options.",
          href: "#program-defaults"
        },
        {
          icon: ClipboardList,
          title: "Custom Fields",
          description: "Set up and manage custom fields",
          href: "#custom-fields",
          showLiveHelp: true
        },
        {
          icon: Mail,
          title: "Message Templates",
          description: "Manage templates for emails and text messages.",
          href: "#message-templates"
        },
        {
          icon: FileText,
          title: "Forms",
          description: "Create and manage forms.",
          href: "#forms"
        },
        {
          icon: Globe,
          title: "Website & Branding",
          description: "Customize your website and visual appearance.",
          href: "#website-branding"
        },
        {
          icon: ClipboardList,
          title: "Rental Applications",
          description: "Design and manage online rental application questions.",
          href: "#rental-applications"
        },
        {
          icon: Bell,
          title: "Push Notifications",
          description: "Enable and configure push notifications to your mobile device(s).",
          href: "#push-notifications"
        }
      ]
    },
    {
      id: 'tools',
      title: "Tools",
      items: [
        {
          icon: UserCog,
          title: "Integration Settings",
          description: "Configure third-party integrations and APIs.",
          href: "#integrations"
        },
        {
          icon: Phone,
          title: "Communication Preferences",
          description: "Set up email and messaging preferences.",
          href: "#communication"
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <button 
              onClick={() => toggleSection(section.id as keyof typeof expandedSections)}
              className="w-full flex items-center justify-between p-3 bg-primary text-white rounded-t-lg hover:bg-primary-600 transition-colors"
            >
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <ChevronDown className={cn(
                "h-5 w-5 transition-transform",
                expandedSections[section.id as keyof typeof expandedSections] ? "transform rotate-180" : ""
              )} />
            </button>
            
            {expandedSections[section.id as keyof typeof expandedSections] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all relative"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    {item.showLiveHelp && (
                      <div className="absolute top-2 right-2">
                        <Button size="sm" variant="secondary" className="text-xs bg-blue-500 text-white hover:bg-blue-600">
                          Live Expert Help
                        </Button>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <footer className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-600">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="space-x-4">
              <a href="#terms" className="hover:text-primary">Terms & Conditions</a>
              <span>|</span>
              <a href="#knowledge" className="hover:text-primary">Knowledge Base</a>
              <span>|</span>
              <a href="#refer" className="hover:text-primary">Refer a Friend</a>
            </div>
            <div>
              © 2008 - {new Date().getFullYear()} Rentec Direct, LLC
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Settings;