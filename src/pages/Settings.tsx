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
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const sections = [
    {
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
          href: "#login-password"
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
      title: "Financial",
      items: [
        {
          icon: CreditCard,
          title: "Payment Settings",
          description: "Configure payment methods and preferences.",
          href: "#payment-settings"
        },
        {
          icon: FileText,
          title: "Billing History",
          description: "View and download past invoices.",
          href: "#billing-history"
        }
      ]
    },
    {
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
          href: "#custom-fields"
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
      title: "Tools",
      items: [
        {
          icon: UserCog,
          title: "Integration Settings",
          description: "Configure third-party integrations and APIs.",
          href: "#integrations"
        },
        {
          icon: MessageSquare,
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
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
              <Button variant="ghost" size="sm">
                <span className="sr-only">Toggle {section.title}</span>
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all"
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
                </a>
              ))}
            </div>
          </div>
        ))}

        <footer className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-600">
          <div className="flex justify-between items-center">
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